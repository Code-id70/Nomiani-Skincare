from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Create an admin user (is_staff=True, is_superuser=True)"

    def add_arguments(self, parser):
        parser.add_argument("--username", required=True, help="Admin username")
        parser.add_argument("--email", required=False, help="Admin email")
        parser.add_argument("--password", required=True, help="Admin password")

    def handle(self, *args, **options):
        username = options["username"]
        email = options.get("email", "")
        password = options["password"]

        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.set_password(password)
            if email:
                user.email = email
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Updated existing user '{username}' to admin."))
        else:
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
            )
            self.stdout.write(self.style.SUCCESS(f"Created admin user '{username}'."))
