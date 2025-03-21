from rest_framework import permissions


class IsManager(permissions.BasePermission):
    """Access only for managers"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manager' or request.user.is_superuser


class IsManagerOrReadOnlyForClientAndService(permissions.BasePermission):
    """Access for edit only for manager, safe methods for client and service"""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS: # have read permission if GET, HEAD, OPTION
            return request.user.is_authenticated
        return request.user.is_authenticated and request.user.role == 'manager' or request.user.is_superuser


class IsServiceAndManagerOrReadOnlyForClient(permissions.BasePermission):
    """Access for edit for manager and service, safe methods for client"""

    def has_permission(self, request, view):
        access = ['service', 'manager']
        if request.method in permissions.SAFE_METHODS: return request.user.is_authenticated
        return request.user.is_authenticated and request.user.role in access or request.user.is_superuser


class IsManagerOrReadOnlyForAll(permissions.BasePermission):
    """Edit acces for manager, safe methods for all"""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS: return True
        return request.user.role == 'manager' or request.user.is_superuser
