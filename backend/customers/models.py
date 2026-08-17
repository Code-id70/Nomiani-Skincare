from django.db import models
from django.conf import settings


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def total_orders(self):
        return self.orders.count()

    @property
    def total_spent(self):
        return sum(order.total for order in self.orders.filter(payment_status='PAID'))

    @property
    def last_order(self):
        return self.orders.order_by('-created_at').first()
