from rest_framework import viewsets, status
from rest_framework.response import Response


class BaseViewSet(viewsets.ModelViewSet):
    """
    Base ViewSet that wraps all responses in the standard DELI EGGS API format.
    """

    def _wrap_response(self, data, status_code=status.HTTP_200_OK):
        return Response({'success': True, 'data': data}, status=status_code)

    def _wrap_error(self, message, status_code=status.HTTP_400_BAD_REQUEST):
        return Response({'success': False, 'message': message}, status=status_code)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return self._wrap_response(response.data)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return self._wrap_response(response.data)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return self._wrap_response(response.data, status_code=response.status_code)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return self._wrap_response(response.data, status_code=response.status_code)

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        return self._wrap_response(response.data, status_code=response.status_code)

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return self._wrap_response({'detail': 'Deleted successfully.'}, status_code=response.status_code)
