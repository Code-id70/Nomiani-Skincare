from django.db import models
from django.conf import settings


class BusinessSettings(models.Model):
    business_name = models.CharField(max_length=200, default='DELI EGGS')
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    collection_address = models.TextField(blank=True)
    delivery_rate_per_km = models.DecimalField(max_digits=6, decimal_places=2, default=1.20)
    minimum_delivery_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    business_hours = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = 'Business Setting'
        verbose_name_plural = 'Business Settings'

    def __str__(self):
        return self.business_name
