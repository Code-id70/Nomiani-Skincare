from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin/staff users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow read-only for anyone, but write operations only for admin/staff.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
