from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dj_rest_auth.views import LoginView
from .views import *


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'service-company', ServiceCompanyViewSet, basename='service-company')
router.register(r'maintenance-type', MaintenanceTypeViewSet, basename='maintenance-type')
router.register(r'failed-component', FailedComponentViewSet, basename='failed-component')
router.register(r'recovery-method', RecoveryMethodViewSet, basename='recovery-method')
router.register(r'equipment-model', EquipmentModelViewSet, basename='equipment-model')
router.register(r'engine-model', EngineModelViewSet, basename='engine-model')
router.register(r'transmission-model', TransmissionModelViewSet, basename='transmission-model')
router.register(r'drive-axle-model', DriveAxleModelViewSet, basename='drive-axle-model')
router.register(r'steering-axle-model', SteeringAxleModelViewSet, basename='steering-axle-model')
router.register(r'car', CarViewSet, basename='car')
router.register(r'technical-maintenance', TechnicalMaintenanceViewSet, basename='technical-maintenance')
router.register(r'claim', ClaimViewSet, basename='claim')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='rest_login'),
]
