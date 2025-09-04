from django.urls import path

from . import views
from . import apis
urlpatterns = [
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('logout/', views.LogoutAPI.as_view(), name='logout'),
    path('change-password/',views.ChangePasswordAPI.as_view(),name='change-password'),
    path('sendactivate/',views.ResendActivationCode.as_view(),name='sendactivate'),
    path('activate/',views.ActivateAccountAPI.as_view(),name='activate'),
    path('resetpassword/',views.PasswordResetAPI.as_view(),name='resetpassword'),
    path('resetpassword-verify/',views.PasswordResetVerifyAPI.as_view(),name='PasswordResetVerifyAPI'),
    path('password-reset-done/',views.PasswordResetDoneAPI.as_view(),name='password_reset_done'),
    path('delete-account/', views.DeleteAccountAPI.as_view(), name='delete-account'),

    

]

