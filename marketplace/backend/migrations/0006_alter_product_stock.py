# Generated by Django 5.1 on 2024-10-30 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_product_lead_time_weeks_product_markup_adjust_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
