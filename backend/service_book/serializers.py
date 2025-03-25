from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'password', 'name', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


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
        depth = 1
        fields = '__all__'

    def create(self, validated_data):
        ctx_data = self.context['data']
        username = ctx_data['client']
        try:
            validated_data['client'] = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": ["Пользователь с таким никнеймом не найден"]})

        validated_data['equipment_model'] = EquipmentModel.objects.get(id=ctx_data['equipment_model'])
        validated_data['engine_model'] = EngineModel.objects.get(id=ctx_data['engine_model'])
        validated_data['transmission_model'] = TransmissionModel.objects.get(id=ctx_data['transmission_model'])
        validated_data['drive_axle_model'] = DriveAxleModel.objects.get(id=ctx_data['drive_axle_model'])
        validated_data['steering_axle_model'] = SteeringAxleModel.objects.get(id=ctx_data['steering_axle_model'])
        validated_data['service_company'] = ServiceCompany.objects.get(id=ctx_data['service_company'])

        return Car.objects.create(**validated_data)



class CarLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        depth = 1
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
        depth = 1

    def create(self, validated_data):
        user = self.context['user']
        ctx_data = self.context['data']
        try:
            car = Car.objects.get(factory_serial_number=ctx_data['car'])
        except Car.DoesNotExist:
            raise serializers.ValidationError({"car": ["Машина с таким номером не найдена"]})

        if user.role == "client" and car.client != user:
            raise serializers.ValidationError({"car": ["Вы не можете добавлять записи о чужом транспорте"]})

        validated_data['maintenance_type'] = MaintenanceType.objects.get(id=ctx_data['maintenance_type'])
        validated_data['service_company'] = ServiceCompany.objects.get(id=ctx_data['service_company'])
        validated_data['car'] = car

        return TechnicalMaintenance.objects.create(**validated_data)


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        print('asd')
        ctx_data = self.context['data']
        try:
            validated_data['car'] = Car.objects.get(factory_serial_number=ctx_data['car'])
        except Car.DoesNotExist:
            raise serializers.ValidationError({"car": ["Машина с таким номером не найдена"]})

        validated_data['failed_component'] = FailedComponent.objects.get(id=ctx_data['failed_component'])
        validated_data['recovery_method'] = RecoveryMethod.objects.get(id=ctx_data['recovery_method'])
        validated_data['service_company'] = ServiceCompany.objects.get(id=ctx_data['service_company'])

        return Claim.objects.create(**validated_data)

