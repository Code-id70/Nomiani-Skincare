from django.urls import path
from .views import OrderViewSet, OrderStatusView

urlpatterns = [
    path('', OrderViewSet.as_view({'get': 'list', 'post': 'create'}), name='order-list'),
    path('<int:pk>/', OrderViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='order-detail'),
    path('<str:order_number>/', OrderStatusView.as_view(), name='order-status'),
]
