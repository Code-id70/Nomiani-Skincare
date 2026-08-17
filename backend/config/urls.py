from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    # Public product endpoints
    path('api/products/', include('products.urls')),
    # Admin product endpoints
    path('api/admin/products/', include('products.urls')),
    # Customer order endpoints
    path('api/orders/', include('orders.urls')),
    # Admin order endpoints
    path('api/admin/orders/', include('orders.urls')),
    # Admin customer endpoints
    path('api/admin/customers/', include('customers.urls')),
    # Admin dashboard endpoints
    path('api/admin/', include('dashboard.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
