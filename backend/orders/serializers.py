from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_price', 'subtotal']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer', 'customer_name', 'order_type',
            'delivery_address', 'delivery_distance', 'delivery_fee',
            'subtotal', 'total', 'payment_status', 'payment_reference',
            'payment_method', 'order_status', 'notes', 'created_at', 'updated_at',
            'items',
        ]
        read_only_fields = ['id', 'order_number', 'created_at', 'updated_at']

    def get_customer_name(self, obj):
        if obj.customer:
            return f"{obj.customer.first_name} {obj.customer.last_name}"
        return None


class OrderCreateSerializer(serializers.Serializer):
    customer_first_name = serializers.CharField()
    customer_last_name = serializers.CharField()
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(required=False, allow_blank=True)
    customer_address = serializers.CharField(required=False, allow_blank=True)
    order_type = serializers.ChoiceField(choices=Order.ORDER_TYPE_CHOICES, default='COLLECTION')
    delivery_address = serializers.CharField(required=False, allow_blank=True)
    delivery_distance = serializers.DecimalField(max_digits=6, decimal_places=2, required=False, allow_null=True)
    items = serializers.ListField(child=serializers.DictField(), allow_empty=False)
    notes = serializers.CharField(required=False, allow_blank=True)
    payment_method = serializers.CharField(required=False, allow_blank=True)
    payment_reference = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        if attrs.get('order_type') == 'DELIVERY' and not attrs.get('delivery_address'):
            raise serializers.ValidationError('Delivery address is required for delivery orders.')
        if not attrs.get('items'):
            raise serializers.ValidationError('Order must contain at least one item.')
        return attrs
