from rest_framework.permissions import BasePermission

class IsClient(BasePermission):
    """Access only for clients"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'client'


class IsServiceOrg(BasePermission):
    """Access only for service organizations"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'service'


class IsManager(BasePermission):
    """Access only for managers"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manager'
