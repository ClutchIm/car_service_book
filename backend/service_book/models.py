from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    ROLE_CHOICES = [
        ('client', 'Клиент'),
        ('service', 'Сервисная организация'),
        ('manager', 'Менеджер'),
    ]
    name = models.CharField(max_length=155, verbose_name='Имя/Название компании')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client', verbose_name='Роль')

    def __str__(self):
        return self.name


class ServiceCompany(models.Model):
    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'

    name = models.CharField(max_length=255, verbose_name="Название модели техники")
    description = models.TextField(verbose_name="Описание модели техники", blank=True)

    def __str__(self):
        return self.name


class MaintenanceType(models.Model):
    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Вид ТО'

    name = models.CharField(max_length=255, verbose_name="Название ТО")
    description = models.TextField(verbose_name="Описание ТО", blank=True)

    def __str__(self):
        return self.name


class FailedComponent(models.Model):
    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узлы отказов'

    name = models.CharField(max_length=255, verbose_name="Название узла отказа")
    description = models.TextField(verbose_name="Описание узла отказа", blank=True)

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'

    name = models.CharField(max_length=255, verbose_name="Название способа восстановления")
    description = models.TextField(verbose_name="Описание способа восстановления", blank=True)

    def __str__(self):
        return self.name


class EquipmentModel(models.Model):
    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'

    name = models.CharField(max_length=255, verbose_name="Название модели техники")
    description = models.TextField(verbose_name="Описание модели техники", blank=True)

    def __str__(self):
        return self.name


class EngineModel(models.Model):
    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'

    name = models.CharField(max_length=255, verbose_name="Название модели двигателя")
    description = models.TextField(verbose_name="Описание модели двигателя", blank=True)

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):
    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссии'

    name = models.CharField(max_length=255, verbose_name="Название модели трансмиссии")
    description = models.TextField(verbose_name="Описание модели трансмиссии", blank=True)

    def __str__(self):
        return self.name


class DriveAxleModel(models.Model):
    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'

    name = models.CharField(max_length=255, verbose_name="Название модели ведущего моста")
    description = models.TextField(verbose_name="Описание модели ведущего моста", blank=True)

    def __str__(self):
        return self.name


class SteeringAxleModel(models.Model):
    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'

    name = models.CharField(max_length=255, verbose_name="Название модели управляемого моста")
    description = models.TextField(verbose_name="Описание модели управляемого моста", blank=True)

    def __str__(self):
        return self.name


class Car(models.Model):
    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

    factory_serial_number = models.CharField(max_length=255, unique=True, verbose_name="Заводской номер машины")
    equipment_model = models.ForeignKey(EquipmentModel, on_delete=models.PROTECT, verbose_name="Модель техники")
    engine_model = models.ForeignKey(EngineModel, on_delete=models.PROTECT, verbose_name="Модель двигателя")
    engine_serial_number = models.CharField(max_length=255, verbose_name="Заводской номер двигателя")
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.PROTECT, verbose_name="Модель трансмиссии")
    transmission_serial_number = models.CharField(max_length=255, verbose_name="Заводской номер трансмиссии")
    drive_axle_model = models.ForeignKey(DriveAxleModel, on_delete=models.PROTECT, verbose_name="Модель ведущего моста")
    drive_axle_serial_number = models.CharField(max_length=255, verbose_name="Заводской номер ведущего моста")
    steering_axle_model = models.ForeignKey(SteeringAxleModel, on_delete=models.PROTECT, verbose_name="Модель управляемого моста")
    steering_axle_serial_number = models.CharField(max_length=255, verbose_name="Заводской номер управляемого моста")
    # 10
    supply_contract = models.CharField(max_length=255, verbose_name="Договор поставки №, дата")
    shipment_date = models.DateField(verbose_name="Дата отгрузки с завода")
    consignee = models.CharField(max_length=255, verbose_name="Грузополучатель (конечный потребитель)")
    delivery_address = models.TextField(verbose_name="Адрес поставки (эксплуатации)")
    configuration = models.TextField(verbose_name="Комплектация (доп. опции)")
    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Клиент")
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.PROTECT, verbose_name="Сервисная компания")

    def __str__(self):
        return f'{self.equipment_model}({self.factory_serial_number})'


class TechnicalMaintenance(models.Model):
    class Meta:
        verbose_name = 'ТО'
        verbose_name_plural = 'ТО'

    maintenance_type = models.ForeignKey(MaintenanceType, on_delete=models.PROTECT, verbose_name="Вид ТО")
    maintenance_date = models.DateField(verbose_name="Дата проведения ТО")
    operating_hours = models.PositiveBigIntegerField(verbose_name="Наработка, м/час")
    work_order_number = models.CharField(max_length=255, verbose_name="№ заказ-наряда")
    work_order_date = models.DateField(verbose_name="Дата заказ-наряда")
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Машина")
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.PROTECT, verbose_name="Сервисная компания")

    def __str__(self):
        return f"{self.maintenance_type} - {self.maintenance_date}"


class Claim(models.Model):
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'

    failure_date = models.DateField(verbose_name="Дата отказа")
    operating_hours = models.PositiveBigIntegerField(verbose_name="Наработка, м/час")
    failed_component = models.ForeignKey(FailedComponent, on_delete=models.PROTECT, verbose_name="Узел отказа")
    failure_description = models.TextField(verbose_name="Описание отказа")
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.PROTECT, verbose_name="Способ восстановления")
    used_spare_parts = models.TextField(verbose_name="Используемые запасные части")
    recovery_date = models.DateField(verbose_name="Дата восстановления")
    downtime_days = models.BigIntegerField(editable=False, verbose_name="Время простоя техники")
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Машина")
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.PROTECT, verbose_name="Сервисная компания")

    def __str__(self):
        return f"Рекламация для {self.car} - {self.failure_date}"

    def save(self, *args, **kwargs):
        """Calculate downtime time"""
        if self.failure_date and self.recovery_date:
            self.downtime_days = (self.recovery_date - self.failure_date).days
        else:
            self.downtime_days = 0

        super().save(*args, **kwargs)
