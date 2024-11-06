# Generated by Django 5.1 on 2024-10-30 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_alter_product_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='cost',
            field=models.DecimalField(decimal_places=2, help_text='Cost of the product to the vendor', max_digits=10, null=True),
        ),
    ]
