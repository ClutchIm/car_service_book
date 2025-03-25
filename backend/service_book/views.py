from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
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


class UserDetailViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return User.objects.filter(pk=self.request.user.pk)



class ServiceCompanyViewSet(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class MaintenanceTypeViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceType.objects.all()
    serializer_class = MaintenanceTypeSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class FailedComponentViewSet(viewsets.ModelViewSet):
    queryset = FailedComponent.objects.all()
    serializer_class = FailedComponentSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class RecoveryMethodViewSet(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class EquipmentModelViewSet(viewsets.ModelViewSet):
    queryset = EquipmentModel.objects.all()
    serializer_class = EquipmentModelSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class EngineModelViewSet(viewsets.ModelViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class TransmissionModelViewSet(viewsets.ModelViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class DriveAxleModelViewSet(viewsets.ModelViewSet):
    queryset = DriveAxleModel.objects.all()
    serializer_class = DriveAxleModelSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class SteeringAxleModelViewSet(viewsets.ModelViewSet):
    queryset = SteeringAxleModel.objects.all()
    serializer_class = SteeringAxleModelSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]


class CarViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = CarFilter
    ordering_fields = ['shipment_date']
    ordering = ['shipment_date']

    def get_queryset(self):
        queryset = Car.objects.all()
        if not self.request.user.is_authenticated:
            queryset = queryset.defer(
                'supply_contract', 'shipment_date', 'consignee',
                'delivery_address', 'configuration', 'client', 'service_company'
            )
        return queryset

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return CarSerializer  # Full Data
        return CarLimitedSerializer  # Limited Data

    def get_permissions(self):
        if self.action == 'list':
            return [IsManager()]
        return [IsManagerOrReadOnlyForAll()]

    @action(detail=False, methods=['get'], url_path='by-serial')
    def get_by_serial_number(self, request):
        serial_number = request.query_params.get('factory_serial_number')
        if not serial_number:
            return Response({"error": "Не указан заводской номер"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            car = self.get_queryset().get(factory_serial_number=serial_number)
        except Car.DoesNotExist:
            return Response({"error": "Машина не найдена"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(car)
        return Response(serializer.data)


class TechnicalMaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class = TechnicalMaintenanceSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = TechnicalMaintenanceFilter
    ordering_fields = ['maintenance_date']
    ordering = ['maintenance_date']

    def get_queryset(self):
        return TechnicalMaintenance.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            return [IsManager()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'], url_path='by-car-id')
    def get_by_car_id(self, request):
        car_id = request.query_params.get('car_id', None)
        if not car_id:
            return Response({"error": "Car id not specified"}, status=status.HTTP_400_BAD_REQUEST)

        technical_maintenance = self.get_queryset().filter(car__id=car_id).order_by('maintenance_date')

        if not technical_maintenance.exists():
            return Response({"error": "Technical Maintenance info not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(technical_maintenance, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = TechnicalMaintenanceSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Technical Maintenance created successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ClaimViewSet(viewsets.ModelViewSet):
    serializer_class = ClaimSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ClaimFilter
    ordering_fields = ['failure_date']
    ordering = ['failure_date']

    def get_queryset(self):
        return Claim.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            return [IsManager()]
        return [IsServiceAndManagerOrReadOnlyForClient()]

    @action(detail=False, methods=['get'], url_path='by-car-id', permission_classes=[IsManagerOrReadOnlyForAll])
    def get_by_car_id(self, request):
        car_id = request.query_params.get('car_id', None)
        if not car_id:
            return Response({"error": "Car id not specified"}, status=status.HTTP_400_BAD_REQUEST)

        claims = self.get_queryset().filter(car__id=car_id).order_by('failure_date')

        if not claims.exists():
            return Response({"error": "Claims info not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(claims, many=True)
        return Response(serializer.data)
