from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dj_rest_auth.views import LoginView, LogoutView
from .views import *


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'user', UserDetailViewSet, basename='user')
router.register(r'service-company', ServiceCompanyViewSet, basename='service-company')
router.register(r'maintenance-type', MaintenanceTypeViewSet, basename='maintenance-type')
router.register(r'failed-component', FailedComponentViewSet, basename='failed-component')
router.register(r'recovery-method', RecoveryMethodViewSet, basename='recovery-method')
router.register(r'equipment', EquipmentModelViewSet, basename='equipment')
router.register(r'engine', EngineModelViewSet, basename='engine')
router.register(r'transmission', TransmissionModelViewSet, basename='transmission')
router.register(r'drive-axle', DriveAxleModelViewSet, basename='drive-axle')
router.register(r'steering-axle', SteeringAxleModelViewSet, basename='steering-axle')
router.register(r'car', CarViewSet, basename='car')
router.register(r'technical-maintenance', TechnicalMaintenanceViewSet, basename='technical-maintenance')
router.register(r'claim', ClaimViewSet, basename='claim')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('auth/logout/', LogoutView.as_view(), name='rest_logout'),
]
