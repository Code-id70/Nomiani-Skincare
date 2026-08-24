from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminProductViewSet

router = DefaultRouter()
router.register(r'', AdminProductViewSet, basename='admin-product')

urlpatterns = [
    path('', include(router.urls)),
]
