from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, AdminProductViewSet

public_router = DefaultRouter()
public_router.register(r'', ProductViewSet, basename='product')

admin_router = DefaultRouter()
admin_router.register(r'', AdminProductViewSet, basename='admin-product')

urlpatterns = [
    path('', include(public_router.urls)),
    path('admin/', include(admin_router.urls)),
]
