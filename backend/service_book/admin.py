from django.contrib import admin
from .models import *

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
