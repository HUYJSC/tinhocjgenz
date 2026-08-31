from rest_framework import generics, permissions
from .models import AuditLog
from .serializers import AuditLogSerializer

class IsAdminRole(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')

class AuditLogListView(generics.ListAPIView):
    permission_classes = [IsAdminRole]
    queryset = AuditLog.objects.select_related('user').all()
    serializer_class = AuditLogSerializer
