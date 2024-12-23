# Generated by Django 5.1 on 2024-10-30 12:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_product_cost'),
    ]

    operations = [
        migrations.CreateModel(
            name='ManufacturerImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='manufacturer_images/')),
                ('manufacturer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='backend.productmanufacturer')),
            ],
        ),
    ]
