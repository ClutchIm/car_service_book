from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import *
from .permissions import *
from .serializers import *
from .filters import *


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsManager]

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        """Создание пользователя (только менеджер и админ)"""
        if request.user.role not in ['manager']:
            return Response({"error": "Only managers can create users"}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceCompanyViewSet(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class MaintenanceTypeViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceType.objects.all()
    serializer_class = MaintenanceTypeSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class FailedComponentViewSet(viewsets.ModelViewSet):
    queryset = FailedComponent.objects.all()
    serializer_class = FailedComponentSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class RecoveryMethodViewSet(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class EquipmentModelViewSet(viewsets.ModelViewSet):
    queryset = EquipmentModel.objects.all()
    serializer_class = EquipmentModelSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class EngineModelViewSet(viewsets.ModelViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class TransmissionModelViewSet(viewsets.ModelViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class DriveAxleModelViewSet(viewsets.ModelViewSet):
    queryset = DriveAxleModel.objects.all()
    serializer_class = DriveAxleModelSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class SteeringAxleModelViewSet(viewsets.ModelViewSet):
    queryset = SteeringAxleModel.objects.all()
    serializer_class = SteeringAxleModelSerializer
    permission_classes = [IsManagerOrReadOnlyForClientAndService]


class CarViewSet(viewsets.ModelViewSet):
    permission_classes = [IsManagerOrReadOnlyForAll]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = CarFilter
    ordering_fields = ['shipment_date']
    ordering = ['shipment_date']

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Car.objects.all()
        return Car.objects.only(
            'factory_serial_number', 'equipment_model',
            'engine_model', 'engine_serial_number',
            'transmission_model', 'transmission_serial_number',
            'drive_axle_model', 'drive_axle_serial_number',
            'steering_axle_model', 'steering_axle_serial_number'
        )

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return CarSerializer  # Full data
        return CarLimitedSerializer  # Limited data


class TechnicalMaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class = TechnicalMaintenanceSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = TechnicalMaintenanceFilter
    ordering_fields = ['maintenance_date']
    ordering = ['maintenance_date']

    def get_queryset(self):
        return TechnicalMaintenance.objects.all()


class ClaimViewSet(viewsets.ModelViewSet):
    serializer_class = ClaimSerializer
    permission_classes = [IsServiceAndManagerOrReadOnlyForClient]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ClaimFilter
    ordering_fields = ['failure_date']
    ordering = ['failure_date']

    def get_queryset(self):
        return Claim.objects.all()
