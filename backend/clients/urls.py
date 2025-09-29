from django.urls import path
from . import views

urlpatterns = [
    path('', views.ClientListCreateAPIView.as_view(), name='client-list-create'),
    path('choices/', views.get_client_choices, name='client-choices'),  # New endpoint for choices
]
