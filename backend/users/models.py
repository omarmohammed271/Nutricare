from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self._create_user(email, password, **extra_fields)
    
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    is_nutritionist = models.BooleanField(default=False)
    is_trainee = models.BooleanField(default=False)
    locale = models.CharField(max_length=10, default='en')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

    role = models.CharField(max_length=20, choices=[
        ('admin', 'Admin'),
        ('nutritionis', 'Nutritionis'),
        ('trainee', 'Trainee'),
    ], default='trainee')

    activation_code = models.CharField(max_length=6, blank=True, null=True)
    activation_code_created_at = models.DateTimeField(blank=True, null=True)

    password_reset_code = models.CharField(max_length=6, blank=True, null=True)
    password_reset_code_created_at = models.DateTimeField(blank=True, null=True)


class Platforms(models.Model):
    name = models.CharField(max_length=100, unique=True)
    logo = models.ImageField(upload_to='platforms/logos/', blank=True, null=True)
    auth_endpoint = models.URLField(blank=True, null=True)
    stream_key_required = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class ConnectedAccount(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='connected_accounts')
    platform = models.ForeignKey(Platforms, on_delete=models.CASCADE)
    access_token = models.TextField()
    refresh_token = models.TextField(blank=True, null=True)
    token_expires_at = models.DateTimeField(blank=True, null=True)
    account_name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    platform_user_id = models.CharField(max_length=255, blank=True, null=True)
    stream_key = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.account_name} ({self.platform.name})"       









