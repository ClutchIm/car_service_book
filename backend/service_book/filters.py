import django_filters
from .models import Car, TechnicalMaintenance, Claim

class CarFilter(django_filters.FilterSet):
    equipment_model = django_filters.CharFilter(field_name="equipment_model__name", lookup_expr="icontains")
    engine_model = django_filters.CharFilter(field_name="engine_model__name", lookup_expr="icontains")
    transmission_model = django_filters.CharFilter(field_name="transmission_model__name", lookup_expr="icontains")
    drive_axle_model = django_filters.CharFilter(field_name="drive_axle_model__name", lookup_expr="icontains")
    steering_axle_model = django_filters.CharFilter(field_name="steering_axle_model__name", lookup_expr="icontains")

    class Meta:
        model = Car
        fields = ['equipment_model', 'engine_model', 'transmission_model', 'drive_axle_model', 'steering_axle_model']

class TechnicalMaintenanceFilter(django_filters.FilterSet):
    maintenance_type = django_filters.CharFilter(field_name="maintenance_type__name", lookup_expr="icontains")
    factory_serial_number = django_filters.CharFilter(lookup_expr="icontains")
    service_company = django_filters.CharFilter(field_name="service_company__name", lookup_expr="icontains")

    class Meta:
        model = TechnicalMaintenance
        fields = ['maintenance_type', 'factory_serial_number', 'service_company']

class ClaimFilter(django_filters.FilterSet):
    failed_component = django_filters.CharFilter(field_name="failed_component__name", lookup_expr="icontains")
    recovery_method = django_filters.CharFilter(field_name="recovery_method__name", lookup_expr="icontains")
    service_company = django_filters.CharFilter(field_name="service_company__name", lookup_expr="icontains")

    class Meta:
        model = Claim
        fields = ['failed_component', 'recovery_method', 'service_company']
