from rest_framework import serializers
from .models import Product, ThirdPartyVendor, ProductManufacturer, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    vendor = serializers.StringRelatedField()
    manufacturer = serializers.StringRelatedField()
    manufacturer_logo = serializers.SerializerMethodField()  # Add manufacturer_logo field

    class Meta:
        model = Product
        fields = ['id', 'name', 'part_number', 'description', 'price', 'cost', 'stock', 'is_active',
                  'vendor', 'manufacturer', 'images', 'manufacturer_logo']

    def get_manufacturer_logo(self, obj):
        # Check if the manufacturer has any images and return the first one
        if obj.manufacturer and obj.manufacturer.images.exists():
            return obj.manufacturer.images.first().image.url  # Return URL of the first image
        return None  # Return None if no manufacturer logo is available

class ThirdPartyVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdPartyVendor
        fields = ['id', 'name', 'description', 'contact_email', 'contact_phone', 'website']

class ProductManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductManufacturer
        fields = ['id', 'name', 'description', 'website']


# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
