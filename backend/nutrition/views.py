from rest_framework import viewsets,status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Equation, Calculation,Drug,DrugCategory

from .serializers import EquationSerializer, CalculationSerializer,DrugSerializer,DrugCategorySerializer


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



class DrugCategoryListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        drugs_categories = DrugCategory.objects.all()
        serializer = DrugCategorySerializer(drugs_categories, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class DrugListAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request,category_id, *args, **kwargs):
        if category_id:
            drugs = Drug.objects.select_related('category').filter(category_id=category_id)
            serializer = DrugSerializer(drugs, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({"detail":"Category ID is required."},status=status.HTTP_400_BAD_REQUEST)

class DrugDetailAPIView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Drug.objects.select_related('category').all()
    serializer_class = DrugSerializer
    lookup_field = 'id'
      


