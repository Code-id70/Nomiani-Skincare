from django.urls import path
from .views import create_yoco_checkout, verify_yoco_payment

urlpatterns = [
    path('yoco/checkout/', create_yoco_checkout, name='yoco-checkout'),
    path('yoco/verify/', verify_yoco_payment, name='yoco-verify'),
]
