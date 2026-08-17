from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'price', 'stock_quantity', 'in_stock', 'featured', 'category', 'created_at')
    list_filter = ('in_stock', 'featured', 'category', 'created_at')
    search_fields = ('name', 'slug', 'description', 'category')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
