from django.http import JsonResponse
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        if hasattr(response.data, 'get') and 'detail' in response.data:
            message = response.data['detail']
        elif isinstance(response.data, dict):
            message = response.data
        else:
            message = str(response.data)
        return JsonResponse({
            'success': False,
            'message': message,
        }, status=response.status_code)
    return JsonResponse({
        'success': False,
        'message': str(exc),
    }, status=500)
