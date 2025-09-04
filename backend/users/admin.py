from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from .models import CustomUser

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email', 'username')  # Fields shown during user creation

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    
    list_display = ('email', 'username', 'role', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('email', 'username')
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser')
    ordering = ('-date_joined',)
    readonly_fields = ('last_login', 'date_joined')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('username',)}),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'role',
                'groups',
                'user_permissions',
            ),
        }),
        (_('Important Dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Security Codes'), {
            'fields': (
                'activation_code',
                'activation_code_created_at',
                'password_reset_code',
                'password_reset_code_created_at',
            ),
            'classes': ('collapse',),
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_active', 'is_staff'),
        }),
    )
    
    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)