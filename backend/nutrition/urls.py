from django.urls import path
from . import views


urlpatterns = [
    path('equations/', views.nutrition_api.EquationsView.as_view(), name='equations'),
    path('compute/', views.nutrition_api.ComputeView.as_view(), name='compute'),
]