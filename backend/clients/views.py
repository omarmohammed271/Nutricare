from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from .models import Client,Appointment,FollowUp
from .serializers import ClientSerializer,AppointmentSerializer,FollowUpSerializer



@extend_schema(
    request=ClientSerializer,         
    responses=ClientSerializer,    
    description="Create new client with all tabs (assessment, biochemical, medication, meal plan)."
)
@extend_schema(
    request=FollowUpSerializer,         
    responses=FollowUpSerializer,    
    description="Create new followup with all tabs (assessment, biochemical, medication, meal plan)."
)


@api_view(['GET'])
def get_client_choices(request):
    choices = {
        'ward_type': dict(Client._meta.get_field('ward_type').choices),
        'physical_activity': dict(Client._meta.get_field('physical_activity').choices),
        'stress_factor': dict(Client._meta.get_field('stress_factor').choices),
        'feeding_type': dict(Client._meta.get_field('feeding_type').choices),
        'gender': dict(Client._meta.get_field('gender').choices),
    }
    return Response(choices)
@api_view(['GET'])
def get_appointment_choices(request):
    choices = {
        'appointment_type': dict(Appointment._meta.get_field('appointment_type').choices),
        'status': dict(Appointment._meta.get_field('status').choices),
    }
    return Response(choices)
class ClientListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Client.objects.filter(user=self.request.user)

    
    def perform_create(self, serializer):
        serializer.save()   

class ClientRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

    def get_queryset(self):
        return Client.objects.filter(user=self.request.user)     


class FollowUpListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = FollowUpSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FollowUp.objects.filter(client__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()
class FollowUpRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FollowUpSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

    def get_queryset(self):
        return FollowUp.objects.filter(client__user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()        
    
class AppointmentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(doctor_name=self.request.user)
    def perform_create(self, serializer):
        serializer.save()

class AppointmentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

    def get_queryset(self):
        return Appointment.objects.filter(doctor_name=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()

    