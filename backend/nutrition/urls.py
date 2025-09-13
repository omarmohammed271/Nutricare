from django.urls import path
from . import views


urlpatterns = [
    
    path("calc/", views.CalcAPIView.as_view(), name="api-calc"),
]