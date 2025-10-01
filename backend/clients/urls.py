from django.urls import path
from . import views

urlpatterns = [
    path('', views.ClientListCreateAPIView.as_view(), name='client-list-create'),
    path('<int:id>/', views.ClientRetrieveUpdateDestroyAPIView.as_view(), name='client-retrieve-update-destroy'),
    path('choices/', views.get_client_choices, name='client-choices'),  # New endpoint for choices
]
