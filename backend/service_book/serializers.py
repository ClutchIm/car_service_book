from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


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


class CarLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = [
            'factory_serial_number', 'equipment_model',
            'engine_model', 'engine_serial_number',
            'transmission_model', 'transmission_serial_number',
            'drive_axle_model', 'drive_axle_serial_number',
            'steering_axle_model', 'steering_axle_serial_number'
        ]


class TechnicalMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalMaintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
