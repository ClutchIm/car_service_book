# Generated by Django 5.1.7 on 2025-03-21 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_book', '0003_alter_user_options_user_name_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=155, verbose_name='Имя/Название компании'),
        ),
    ]
