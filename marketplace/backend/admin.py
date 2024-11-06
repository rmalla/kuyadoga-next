from django.contrib import admin
from .models import ThirdPartyVendor, Product, ProductImage,ProductManufacturer, ManufacturerImage
from django.utils.html import format_html

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    max_num = 10
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-width: 150px; max-height: 150px;" />', obj.image.url)
        return "No image"

    image_tag.short_description = 'Image'

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'manufacturer','part_number', 'price', 'stock', 'is_active', 'created_at')
    search_fields = ('name', 'part_number')
    list_filter = ('is_active', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductImageInline]

class ThirdPartyVendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_email', 'contact_phone', 'website', 'created_at')
    search_fields = ('name', 'contact_email')
    list_filter = ('created_at',)



class ManufacturerImageInline(admin.TabularInline):
    model = ManufacturerImage
    extra = 1  # Allows one empty slot for new images by default
    readonly_fields = ['image_tag']  # Display the image thumbnail as read-only

    def image_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 150px; height: auto; border: 1px solid #ccc;" />',
                obj.image.url
            )
        return "-"
    image_tag.short_description = 'Image Preview'  # Column header for the image preview


class ProductManufacturerAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    
    inlines = [ManufacturerImageInline]

admin.site.register(ProductManufacturer, ProductManufacturerAdmin)
admin.site.register(ThirdPartyVendor, ThirdPartyVendorAdmin)
admin.site.register(Product, ProductAdmin)
