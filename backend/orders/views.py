from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Sum, Count
from django.conf import settings
from config.views import BaseViewSet
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer, OrderCreateSerializer, OrderItemSerializer
from accounts.permissions import IsAdminUser
from datetime import datetime, timedelta


class OrderViewSet(BaseViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all().prefetch_related('items')
        order_status = self.request.query_params.get('order_status')
        payment_status = self.request.query_params.get('payment_status')
        order_type = self.request.query_params.get('order_type')
        search = self.request.query_params.get('search')

        if order_status:
            queryset = queryset.filter(order_status=order_status)
        if payment_status:
            queryset = queryset.filter(payment_status=payment_status)
        if order_type:
            queryset = queryset.filter(order_type=order_type)
        if search:
            queryset = queryset.filter(
                Q(order_number__icontains=search) |
                Q(customer__first_name__icontains=search) |
                Q(customer__last_name__icontains=search) |
                Q(customer__email__icontains=search) |
                Q(delivery_address__icontains=search)
            )
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # Get or create customer
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

        # Calculate delivery fee
        delivery_fee = 0
        if data.get('order_type') == 'DELIVERY':
            from dashboard.models import BusinessSettings
            settings_obj = BusinessSettings.objects.first()
            rate = settings_obj.delivery_rate_per_km if settings_obj else 1.20
            min_fee = settings_obj.minimum_delivery_fee if settings_obj else 0
            distance = data.get('delivery_distance') or 0
            delivery_fee = max(float(rate) * float(distance), float(min_fee))

        # Create order
        payment_status = 'PENDING'
        if data.get('payment_method') in ['Card']:
            payment_status = 'PAID'

        order = Order.objects.create(
            customer=customer,
            order_type=data['order_type'],
            delivery_address=data.get('delivery_address', ''),
            delivery_distance=data.get('delivery_distance'),
            delivery_fee=delivery_fee,
            payment_status=payment_status,
            payment_reference=data.get('payment_reference', ''),
            payment_method=data.get('payment_method', ''),
            notes=data.get('notes', ''),
        )

        # Create order items
        subtotal = 0
        for item_data in data['items']:
            product = None
            if item_data.get('product_id'):
                try:
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

        return Response({
            'success': True,
            'data': OrderSerializer(order).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='by-number/(?P<order_number>[^/.]+)')
    def by_order_number(self, request, order_number=None):
        try:
            order = Order.objects.get(order_number=order_number)
        except Order.DoesNotExist:
            return Response({'success': False, 'message': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(order)
        return Response({'success': True, 'data': serializer.data})


# Public endpoint for order status lookup
from rest_framework.views import APIView


class OrderStatusView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request, order_number):
        try:
            order = Order.objects.get(order_number=order_number)
        except Order.DoesNotExist:
            return Response({'success': False, 'message': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response({'success': True, 'data': serializer.data})
