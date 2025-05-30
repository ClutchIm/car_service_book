from django.contrib import admin
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ('username', 'password', 'role')
    search_fields = ('username', 'role')


admin.site.register(User, UserAdmin)
admin.site.register(ServiceCompany)
admin.site.register(MaintenanceType)
admin.site.register(FailedComponent)
admin.site.register(RecoveryMethod)
admin.site.register(EquipmentModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(DriveAxleModel)
admin.site.register(SteeringAxleModel)
admin.site.register(Car)
admin.site.register(TechnicalMaintenance)
admin.site.register(Claim)
