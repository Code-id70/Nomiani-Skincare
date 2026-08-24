from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
import os


def create_admin_user(sender, **kwargs):
    User = get_user_model()
    username = os.environ.get('ADMIN_USERNAME')
    password = os.environ.get('ADMIN_PASSWORD')

    if not username or not password:
        return

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email='',
            password=password,
        )


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        post_migrate.connect(create_admin_user)
