from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Equation, Calculation
from .serializers import EquationSerializer, CalculationSerializer


class EquationViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Equation.objects.all()
    serializer_class = EquationSerializer


class CalculationViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Calculation.objects.all().order_by("-created_at")
    serializer_class = CalculationSerializer
