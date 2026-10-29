import os
import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from orders.models import Order, OrderItem
from orders.serializers import OrderCreateSerializer


@authentication_classes([])
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_yoco_checkout(request):
    payload = request.data
    customer_data = payload.get('customer', {})
    delivery_method = payload.get('deliveryMethod', 'COLLECTION')
    items = payload.get('items', [])
    total = payload.get('total', 0)

    if not items:
        return Response({'success': False, 'message': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

    order_type = 'DELIVERY' if delivery_method == 'delivery' else 'COLLECTION'

    order_data = {
        'customer_first_name': customer_data.get('firstName', ''),
        'customer_last_name': customer_data.get('lastName', ''),
        'customer_email': customer_data.get('email', ''),
        'customer_phone': customer_data.get('phone', ''),
        'customer_address': ', '.join(filter(None, [
            customer_data.get('street'),
            customer_data.get('suburb'),
            customer_data.get('city'),
            customer_data.get('postalCode'),
        ])),
        'order_type': order_type,
        'delivery_address': customer_data.get('street', '') + ', ' + customer_data.get('suburb', '') + ', ' + customer_data.get('city', ''),
        'delivery_distance': None,
        'items': items,
        'notes': customer_data.get('notes', ''),
    }

    serializer = OrderCreateSerializer(data=order_data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'message': 'Validation failed.',
            'details': serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)
    data = serializer.validated_data

    from customers.models import Customer
    customer, created = Customer.objects.get_or_create(
        email=data['customer_email'].lower(),
        defaults={
            'first_name': data['customer_first_name'],
            'last_name': data['customer_last_name'],
            'phone': data.get('customer_phone', ''),
            'address': data.get('customer_address', ''),
        }
    )
    if not created:
        customer.first_name = data['customer_first_name']
        customer.last_name = data['customer_last_name']
        if data.get('customer_phone'):
            customer.phone = data['customer_phone']
        if data.get('customer_address'):
            customer.address = data['customer_address']
        customer.save()

    delivery_fee = 0
    if data.get('order_type') == 'DELIVERY':
        from dashboard.models import BusinessSettings
        settings_obj = BusinessSettings.objects.first()
        rate = settings_obj.delivery_rate_per_km if settings_obj else 1.20
        min_fee = settings_obj.minimum_delivery_fee if settings_obj else 0
        distance = data.get('delivery_distance') or 0
        delivery_fee = max(float(rate) * float(distance), float(min_fee))

    order = Order.objects.create(
        customer=customer,
        order_type=data['order_type'],
        delivery_address=data.get('delivery_address', ''),
        delivery_distance=data.get('delivery_distance'),
        delivery_fee=delivery_fee,
        payment_status='PENDING',
        notes=data.get('notes', ''),
    )

    subtotal = 0
    for item_data in data['items']:
        product = None
        if item_data.get('product_id'):
            try:
                from products.models import Product
                product = Product.objects.get(id=item_data['product_id'])
            except Product.DoesNotExist:
                pass
        unit_price = item_data.get('unit_price') or (product.price if product else 0)
        quantity = item_data.get('quantity', 1)
        item_subtotal = float(unit_price) * quantity
        subtotal += item_subtotal
        OrderItem.objects.create(
            order=order,
            product=product,
            product_name=item_data['product_name'],
            quantity=quantity,
            unit_price=unit_price,
            subtotal=item_subtotal,
        )

    order.subtotal = subtotal
    order.total = subtotal + delivery_fee
    order.save()

    yoco_secret = settings.YOCO_SECRET_KEY
    if not yoco_secret:
        return Response({'success': False, 'message': 'Yoco is not configured on the server.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    frontend_url = os.environ.get('FRONTEND_URL', 'https://nomiani-skincare.netlify.app')

    amount_in_cents = int(float(order.total) * 100)

    checkout_payload = {
        'amount': amount_in_cents,
        'currency': 'ZAR',
        'name': 'DELI EGGS',
        'description': f'Order {order.order_number}',
        'metadata': {
            'order_id': order.id,
            'order_number': order.order_number,
        },
        'successUrl': f'{frontend_url}/payment-success?order={order.order_number}',
        'cancelUrl': f'{frontend_url}/payment-cancelled?order={order.order_number}',
    }

    try:
        response = requests.post(
            'https://payments.yoco.com/api/checkouts',
            headers={
                'Authorization': f'Bearer {yoco_secret}',
                'Content-Type': 'application/json',
            },
            json=checkout_payload,
            timeout=20,
        )
    except requests.RequestException as exc:
        return Response({'success': False, 'message': f'Yoco request failed: {str(exc)}'}, status=status.HTTP_502_BAD_GATEWAY)

    if response.status_code not in (200, 201):
        return Response({
            'success': False,
            'message': 'Yoco checkout creation failed.',
            'details': response.text,
        }, status=status.HTTP_502_BAD_GATEWAY)

    data = response.json()
    redirect_url = data.get('redirectUrl') or data.get('redirect_url')
    checkout_id = data.get('id')
    if not redirect_url:
        return Response({'success': False, 'message': 'Yoco did not return a redirect URL.', 'details': data}, status=status.HTTP_502_BAD_GATEWAY)

    if checkout_id:
        order.payment_reference = checkout_id
        order.save(update_fields=['payment_reference'])

    return Response({
        'success': True,
        'data': {
            'order_id': order.id,
            'order_number': order.order_number,
            'redirect_url': redirect_url,
            'amount_in_cents': amount_in_cents,
        }
    }, status=status.HTTP_200_OK)


@authentication_classes([])
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_yoco_payment(request):
    checkout_id = request.data.get('checkout_id') or request.data.get('id')
    if not checkout_id:
        return Response({'success': False, 'message': 'checkout_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

    yoco_secret = settings.YOCO_SECRET_KEY
    if not yoco_secret:
        return Response({'success': False, 'message': 'Yoco is not configured on the server.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        response = requests.get(
            f'https://payments.yoco.com/api/checkouts/{checkout_id}',
            headers={
                'Authorization': f'Bearer {yoco_secret}',
                'Accept': 'application/json',
            },
            timeout=20,
        )
    except requests.RequestException as exc:
        return Response({'success': False, 'message': f'Yoco request failed: {str(exc)}'}, status=status.HTTP_502_BAD_GATEWAY)

    if response.status_code != 200:
        return Response({'success': False, 'message': 'Yoco verification failed.', 'details': response.text}, status=status.HTTP_502_BAD_GATEWAY)

    data = response.json()
    return Response({'success': True, 'data': data}, status=status.HTTP_200_OK)
