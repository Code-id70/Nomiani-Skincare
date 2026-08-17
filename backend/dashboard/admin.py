from django.contrib import admin
from .models import BusinessSettings


@admin.register(BusinessSettings)
class BusinessSettingsAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'phone', 'email', 'delivery_rate_per_km', 'minimum_delivery_fee')
