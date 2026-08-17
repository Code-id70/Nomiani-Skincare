from rest_framework import serializers
from .models import BusinessSettings


class BusinessSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessSettings
        fields = [
            'id', 'business_name', 'phone', 'email', 'collection_address',
            'delivery_rate_per_km', 'minimum_delivery_fee', 'business_hours'
        ]
        read_only_fields = ['id']
