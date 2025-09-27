from django.urls import path
from . import views

urlpatterns = [
    path('', views.ClientListCreateAPIView.as_view(), name='client-list-create'),
]
