# Generated by Django 5.1 on 2024-11-11 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_customer_order_orderline'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='product',
            constraint=models.UniqueConstraint(fields=('manufacturer', 'part_number'), name='unique_manufacturer_part_number'),
        ),
    ]
