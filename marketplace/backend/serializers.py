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


# serializers.py

from rest_framework import serializers
from .models import Customer, Order, OrderLine, Product


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLine
        fields = ['product', 'quantity', 'unit_price']


class OrderSerializer(serializers.ModelSerializer):
    order_lines = OrderLineSerializer(many=True)
    customer = CustomerSerializer()
    
    
    class Meta:
        model = Order
        fields = ['customer', 'order_date', 'status', 'order_lines', 'total_price']
    
    
    def create(self, validated_data):
        customer_data = validated_data.pop('customer')
        order_lines_data = validated_data.pop('order_lines')
        
        # Create or get the customer instance
        customer, created = Customer.objects.get_or_create(
            email=customer_data['email'],
            defaults=customer_data
        )
        
        # Create the order instance
        order = Order.objects.create(customer=customer, **validated_data)
        
        # Loop through each line item and create an OrderLine instance
        for line_data in order_lines_data:
            # Retrieve the product instance based on product ID from line_data
            product_id = line_data.pop('product')
            product = Product.objects.get(id=product_id)
            
            # Create OrderLine instance with the product
            OrderLine.objects.create(order=order, product=product, **line_data)
        
        return order

# serializers.py

from rest_framework import serializers
from .models import Customer, Order, OrderLine, Product

class OrderLineSerializer(serializers.ModelSerializer):
    # Define product as an integer field, so it only accepts IDs
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderLine
        fields = ['product', 'quantity', 'unit_price']

class OrderSerializer(serializers.ModelSerializer):
    order_lines = OrderLineSerializer(many=True)
    customer = serializers.DictField(write_only=True)

    class Meta:
        model = Order
        fields = ['customer', 'order_date', 'status', 'order_lines', 'total_price']

    def create(self, validated_data):
        # Extract customer data from validated_data
        customer_data = validated_data.pop('customer')
        order_lines_data = validated_data.pop('order_lines')

        # Retrieve or create the customer instance
        customer, created = Customer.objects.get_or_create(
            email=customer_data['email'],
            defaults=customer_data
        )

        # Create the order instance with the existing or new customer
        order = Order.objects.create(customer=customer, **validated_data)

        # Loop through each line item and create an OrderLine instance using product ID
        for line_data in order_lines_data:
            # Extract product_id directly from line_data
            product_id = line_data['product'].id if isinstance(line_data['product'], Product) else line_data['product']
            OrderLine.objects.create(order=order, product_id=product_id, **line_data)

        return order
