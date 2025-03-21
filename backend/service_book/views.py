from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

from .models import *
from .permissions import *
from .serializers import *

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
    serializer_class = CarSerializer
    permission_classes = [IsManagerOrReadOnlyForAll]

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.queryset = Car.objects.all()
        else:
            self.queryset = Car.objects.all().values_list([
                'factory_serial_number', 'equipment_model',
                'engine_model', 'engine_serial_number',
                'transmission_model', 'transmission_serial_number',
                'drive_axle_model', 'drive_axle_serial_number',
                'steering_axle_model', 'steering_axle_serial_number',
            ])




class TechnicalMaintenanceViewSet(viewsets.ModelViewSet):
    queryset = TechnicalMaintenance.objects.all()
    serializer_class = TechnicalMaintenanceSerializer
    permission_classes = [IsAuthenticated]


class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    permission_classes = [IsServiceAndManagerOrReadOnlyForClient]








# class ServiceCompanyView(APIView):
#     permission_classes = [IsManagerOrReadOnlyForClientAndService]
#
#     def get(self, request, pk=None):
#         if pk:
#             company = get_object_or_404(ServiceCompany, pk=pk)
#             serializer = ServiceCompanySerializer(company)
#             return Response(serializer.data)
#         else:
#             companies = ServiceCompany.objects.all()
#             serializer = ServiceCompanySerializer(companies, many=True)
#             return Response(serializer.data)
#
#     def post(self, request):
#         serializer = ServiceCompanySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#     def put(self, request, pk):
#         company = get_object_or_404(ServiceCompany, pk=pk)
#         serializer = ServiceCompanySerializer(company, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk):
#         company = get_object_or_404(ServiceCompany, pk=pk)
#         company.delete()
#         return Response({"message": "Компания удалена"}, status=status.HTTP_204_NO_CONTENT)



