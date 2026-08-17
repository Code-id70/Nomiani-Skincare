from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'unit_price', 'subtotal')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer', 'order_type', 'total', 'payment_status', 'order_status', 'created_at')
    list_filter = ('order_type', 'payment_status', 'order_status', 'created_at')
    search_fields = ('order_number', 'customer__first_name', 'customer__last_name', 'customer__email', 'delivery_address')
    inlines = [OrderItemInline]
    readonly_fields = ('order_number', 'subtotal', 'total', 'created_at', 'updated_at')
