from django.db import models

class ProductManufacturer(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ThirdPartyVendor(models.Model):
	name = models.CharField(max_length=255)
	description = models.TextField(blank=True, null=True)
	contact_email = models.EmailField()
	contact_phone = models.CharField(max_length=20, blank=True, null=True)
	website = models.URLField(blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	
	
	def __str__(self):
		return self.name


class Product(models.Model):
	vendor = models.ForeignKey(ThirdPartyVendor, on_delete=models.CASCADE, related_name='products',default=2)
	manufacturer = models.ForeignKey(ProductManufacturer, on_delete=models.SET_NULL, null=True, related_name='products')
	name = models.CharField(max_length=255)
	part_number = models.CharField(max_length=100, blank=True, null=True)
	description = models.TextField(null=True)
	description_long = models.TextField(null=True)
	price = models.DecimalField(max_digits=10, decimal_places=2,null=True)
	cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Cost of the product to the vendor",null=True)
	stock = models.PositiveIntegerField(null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_active = models.BooleanField(default=True, help_text="Is the product active and available for purchase?")
	lead_time_weeks = models.PositiveIntegerField(default=0, null=True,blank=True)
	unique_identifier = models.CharField(max_length=255, unique=True, null=True,editable=False)

	replaced = models.BooleanField(default=False, verbose_name='replaced')
	replaced_by = models.CharField(max_length=255, null=True)
	obsolete = models.BooleanField(default=False, verbose_name='obsolete')

	weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
	markup_adjust = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

	
	def __str__(self):
		return self.name
	
	
	class Meta:
		permissions = [
			("manage_all_products", "Can manage all products regardless of vendor"),
		]


class ProductImage(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
	image = models.ImageField(upload_to='product_images/')
	
	
	def __str__(self):
		return f"Image for {self.product.name}"


class ManufacturerImage(models.Model):
	manufacturer = models.ForeignKey(ProductManufacturer, on_delete=models.CASCADE, related_name='images')
	image = models.ImageField(upload_to='manufacturer_images/')
	
	
	def __str__(self):
		return f"Image for {self.manufacturer.name}"
