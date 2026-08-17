from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Sum, Count, Q
from datetime import datetime, timedelta
from .models import BusinessSettings
from .serializers import BusinessSettingsSerializer
from orders.models import Order, OrderItem
from products.models import Product
from customers.models import Customer


class DashboardStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = datetime.now().date()
        total_orders = Order.objects.count()
        today_orders = Order.objects.filter(created_at__date=today).count()
        pending_orders = Order.objects.filter(order_status='PENDING').count()
        completed_orders = Order.objects.filter(order_status='COMPLETED').count()
        total_revenue = Order.objects.filter(payment_status='PAID').aggregate(total=Sum('total'))['total'] or 0
        today_revenue = Order.objects.filter(created_at__date=today, payment_status='PAID').aggregate(total=Sum('total'))['total'] or 0
        customers = Customer.objects.count()
        products = Product.objects.count()
        out_of_stock = Product.objects.filter(in_stock=False).count()

        recent_orders = Order.objects.order_by('-created_at')[:5]
        from orders.serializers import OrderSerializer
        recent_orders_data = OrderSerializer(recent_orders, many=True).data

        return Response({
            'success': True,
            'data': {
                'total_orders': total_orders,
                'today_orders': today_orders,
                'pending_orders': pending_orders,
                'completed_orders': completed_orders,
                'total_revenue': float(total_revenue),
                'today_revenue': float(today_revenue),
                'customers': customers,
                'products': products,
                'out_of_stock': out_of_stock,
                'recent_orders': recent_orders_data,
            }
        })


class AdminAnalyticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        period = request.query_params.get('period', '30_days')
        days_map = {
            'today': 1,
            '7_days': 7,
            '30_days': 30,
            '3_months': 90,
            '12_months': 365,
        }
        days = days_map.get(period, 30)
        start_date = datetime.now() - timedelta(days=days)

        orders = Order.objects.filter(created_at__date__gte=start_date.date())

        revenue_by_day = []
        orders_by_day = []
        current = start_date
        while current <= datetime.now():
            day_orders = orders.filter(created_at__date=current.date())
            day_revenue = day_orders.filter(payment_status='PAID').aggregate(total=Sum('total'))['total'] or 0
            revenue_by_day.append({
                'date': current.strftime('%Y-%m-%d'),
                'revenue': float(day_revenue),
            })
            orders_by_day.append({
                'date': current.strftime('%Y-%m-%d'),
                'count': day_orders.count(),
            })
            current += timedelta(days=1)

        best_selling = OrderItem.objects.filter(order__in=orders).values('product_name').annotate(
            total_quantity=Sum('quantity'),
            total_revenue=Sum('subtotal')
        ).order_by('-total_quantity')[:10]

        delivery_vs_collection = orders.values('order_type').annotate(count=Count('id'))

        total_customers = Customer.objects.count()
        new_customers = Customer.objects.filter(created_at__date__gte=start_date.date()).count()
        returning_customers = total_customers - new_customers

        return Response({
            'success': True,
            'data': {
                'revenue_by_day': revenue_by_day,
                'orders_by_day': orders_by_day,
                'best_selling_products': list(best_selling),
                'delivery_vs_collection': list(delivery_vs_collection),
                'new_customers': new_customers,
                'returning_customers': returning_customers,
                'total_customers': total_customers,
            }
        })


class BusinessSettingsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        settings_obj, _ = BusinessSettings.objects.get_or_create(pk=1)
        serializer = BusinessSettingsSerializer(settings_obj)
        return Response({'success': True, 'data': serializer.data})

    def put(self, request):
        settings_obj, _ = BusinessSettings.objects.get_or_create(pk=1)
        serializer = BusinessSettingsSerializer(settings_obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'data': serializer.data})
