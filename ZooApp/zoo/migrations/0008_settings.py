# Generated by Django 4.2.1 on 2023-11-23 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zoo', '0007_employee_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('value', models.TextField()),
            ],
        ),
    ]
