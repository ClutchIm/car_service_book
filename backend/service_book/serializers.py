from rest_framework import serializers
from .models import *


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = '__all__'


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = '__all__'


class FailedComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailedComponent
        fields = '__all__'


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'


class EquipmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentModel
        fields = '__all__'


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = '__all__'


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = '__all__'


class DriveAxleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriveAxleModel
        fields = '__all__'


class SteeringAxleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteeringAxleModel
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class TechnicalMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalMaintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
