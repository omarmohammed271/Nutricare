from django.urls import path
from . import views

urlpatterns = [
    path('', views.ClientListCreateAPIView.as_view(), name='client-list-create'),
    path('<int:id>/', views.ClientRetrieveUpdateDestroyAPIView.as_view(), name='client-retrieve-update-destroy'),
    path('<int:id>/follow-up/', views.FollowUpListCreateAPIView.as_view(), name='FollowUpListCreateAPIView'),
    path('<int:id>/follow-up/<int:pk>/', views.FollowUpRetrieveUpdateDestroyAPIView.as_view(), name='FollowUpRetrieveUpdateDestroyAPIView'),
    path('appointment/', views.AppointmentListCreateAPIView.as_view(), name='appointment-list-create'),
    path('appointment/<int:id>/', views.AppointmentRetrieveUpdateDestroyAPIView.as_view(), name='appointment-retrieve-update-destroy'),
    path('choices/', views.get_client_choices, name='client-choices'),  
    path('choices-calender/', views.get_appointment_choices, name='client-choices'),  
]
