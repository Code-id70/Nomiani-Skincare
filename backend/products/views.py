from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count, Sum
from datetime import datetime, timedelta
from config.views import BaseViewSet
from .models import Product
from .serializers import ProductSerializer, ProductListSerializer
from accounts.permissions import IsAdminUser, IsAdminOrReadOnly


class ProductViewSet(BaseViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)
        if featured:
            queryset = queryset.filter(featured=True)
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

        return queryset

    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrReadOnly])
    def stock(self, request, slug=None):
        product = self.get_object()
        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({'success': False, 'message': 'Quantity is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            quantity = int(quantity)
            product.stock_quantity = quantity
            product.in_stock = quantity > 0
            product.save()
            return Response({'success': True, 'data': ProductSerializer(product).data})
        except (ValueError, TypeError):
            return Response({'success': False, 'message': 'Invalid quantity.'}, status=status.HTTP_400_BAD_REQUEST)


class AdminProductViewSet(ProductViewSet):
    permission_classes = [IsAdminUser]
    lookup_field = 'pk'

    def get_serializer_class(self):
        return ProductSerializer
