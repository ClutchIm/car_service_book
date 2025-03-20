# Generated by Django 5.1.7 on 2025-03-20 18:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DriveAxleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели ведущего моста')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели ведущего моста')),
            ],
            options={
                'verbose_name': 'Модель ведущего моста',
            },
        ),
        migrations.CreateModel(
            name='EngineModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели двигателя')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели двигателя')),
            ],
            options={
                'verbose_name': 'Модель двигателя',
            },
        ),
        migrations.CreateModel(
            name='EquipmentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели техники')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели техники')),
            ],
            options={
                'verbose_name': 'Модель техники',
            },
        ),
        migrations.CreateModel(
            name='FailedComponent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название узла отказа')),
                ('description', models.TextField(blank=True, verbose_name='Описание узла отказа')),
            ],
            options={
                'verbose_name': 'Узел отказа',
            },
        ),
        migrations.CreateModel(
            name='MaintenanceType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название ТО')),
                ('description', models.TextField(blank=True, verbose_name='Описание ТО')),
            ],
            options={
                'verbose_name': 'Вид ТО',
            },
        ),
        migrations.CreateModel(
            name='RecoveryMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название способа восстановления')),
                ('description', models.TextField(blank=True, verbose_name='Описание способа восстановления')),
            ],
            options={
                'verbose_name': 'Способ восстановления',
            },
        ),
        migrations.CreateModel(
            name='ServiceCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели техники')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели техники')),
            ],
            options={
                'verbose_name': 'Сервисная компания',
            },
        ),
        migrations.CreateModel(
            name='SteeringAxleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели управляемого моста')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели управляемого моста')),
            ],
            options={
                'verbose_name': 'Модель управляемого моста',
            },
        ),
        migrations.CreateModel(
            name='TransmissionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название модели трансмиссии')),
                ('description', models.TextField(blank=True, verbose_name='Описание модели трансмиссии')),
            ],
            options={
                'verbose_name': 'Модель трансмиссии',
            },
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('factory_serial_number', models.CharField(max_length=255, unique=True, verbose_name='Заводской номер машины')),
                ('engine_serial_number', models.CharField(max_length=255, verbose_name='Заводской номер двигателя')),
                ('transmission_serial_number', models.CharField(max_length=255, verbose_name='Заводской номер трансмиссии')),
                ('drive_axle_serial_number', models.CharField(max_length=255, verbose_name='Заводской номер ведущего моста')),
                ('steering_axle_serial_number', models.CharField(max_length=255, verbose_name='Заводской номер управляемого моста')),
                ('supply_contract', models.CharField(max_length=255, verbose_name='Договор поставки №, дата')),
                ('shipment_date', models.DateField(verbose_name='Дата отгрузки с завода')),
                ('consignee', models.CharField(max_length=255, verbose_name='Грузополучатель (конечный потребитель)')),
                ('delivery_address', models.TextField(verbose_name='Адрес поставки (эксплуатации)')),
                ('configuration', models.TextField(verbose_name='Комплектация (доп. опции)')),
                ('client', models.CharField(max_length=255, verbose_name='Клиент')),
                ('drive_axle_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.driveaxlemodel', verbose_name='Модель ведущего моста')),
                ('engine_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.enginemodel', verbose_name='Модель двигателя')),
                ('equipment_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.equipmentmodel', verbose_name='Модель техники')),
                ('service_company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.servicecompany', verbose_name='Сервисная компания')),
                ('steering_axle_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.steeringaxlemodel', verbose_name='Модель управляемого моста')),
                ('transmission_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.transmissionmodel', verbose_name='Модель трансмиссии')),
            ],
            options={
                'verbose_name': 'Машина',
                'verbose_name_plural': 'Машины',
            },
        ),
        migrations.CreateModel(
            name='Claim',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('failure_date', models.DateField(verbose_name='Дата отказа')),
                ('operating_hours', models.PositiveBigIntegerField(verbose_name='Наработка, м/час')),
                ('failure_description', models.TextField(verbose_name='Описание отказа')),
                ('used_spare_parts', models.TextField(verbose_name='Используемые запасные части')),
                ('recovery_date', models.DateField(verbose_name='Дата восстановления')),
                ('downtime_days', models.BigIntegerField(editable=False, verbose_name='Время простоя техники')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='service_book.car', verbose_name='Машина')),
                ('failed_component', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.failedcomponent', verbose_name='Узел отказа')),
                ('recovery_method', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.recoverymethod', verbose_name='Способ восстановления')),
                ('service_company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.servicecompany', verbose_name='Сервисная компания')),
            ],
            options={
                'verbose_name': 'Рекламация',
                'verbose_name_plural': 'Рекламации',
            },
        ),
        migrations.CreateModel(
            name='TechnicalMaintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maintenance_date', models.DateField(verbose_name='Дата проведения ТО')),
                ('operating_hours', models.PositiveBigIntegerField(verbose_name='Наработка, м/час')),
                ('work_order_number', models.CharField(max_length=255, verbose_name='№ заказ-наряда')),
                ('work_order_date', models.DateField(verbose_name='Дата заказ-наряда')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='service_book.car', verbose_name='Машина')),
                ('maintenance_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.maintenancetype', verbose_name='Вид ТО')),
                ('service_company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='service_book.servicecompany', verbose_name='Сервисная компания')),
            ],
            options={
                'verbose_name': 'ТО',
            },
        ),
    ]
