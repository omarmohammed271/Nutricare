from django_filters import rest_framework as filters
from rest_framework import viewsets,status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from .models import *
from .filters import DrugCategoryFilter

from .serializers import *

@extend_schema(
    request=DrugCategorySerializer,          
    responses=DrugCategorySerializer,        
    description="For Drug Category and Drugs"
)

class CategoryEquationViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CategoryEquations.objects.prefetch_related('equations').all()
    serializer_class = CategoryEquationSerializer

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



class DrugCategoryListAPIView(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = DrugCategory.objects.prefetch_related('drugs').all()
    serializer_class = DrugCategorySerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = DrugCategoryFilter
    




class DrugDetailAPIView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Drug.objects.select_related('category').all()
    serializer_class = DrugSerializer
    lookup_field = 'id'
      






# class ScreeningToolList(generics.ListAPIView):
#     queryset = ScreeningTool.objects.all()
#     serializer_class = ScreeningToolSerializer

# class ScreeningToolDetail(generics.RetrieveAPIView):
#     queryset = ScreeningTool.objects.all()
#     serializer_class = ScreeningToolSerializer

# class ScreeningResultList(generics.ListCreateAPIView):
#     serializer_class = ScreeningResultSerializer
    
#     def get_queryset(self):
#         return ScreeningResult.objects.filter(patient_id=self.kwargs['patient_id'])
    
#     def perform_create(self, serializer):
#         serializer.save(patient_id=self.kwargs['patient_id'])

# class ScreeningResultDetail(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ScreeningResultSerializer
    
#     def get_queryset(self):
#         return ScreeningResult.objects.filter(patient_id=self.kwargs['patient_id'])

# class MNA_SF_Create(generics.CreateAPIView):
#     serializer_class = MNA_SF_DataSerializer
    
#     def create(self, request, *args, **kwargs):
#         # Calculate MNA-SF score
#         data = request.data
#         score = 0
        
#         # Scoring logic for MNA-SF
#         if not data.get('has_appetite_loss'):
#             score += 2
#         if data.get('weight_loss', 0) < 3:
#             score += 3
#         elif data.get('weight_loss', 0) < 6:
#             score += 2
#         else:
#             score += 0
            
#         # Add other scoring components...
        
#         # Determine risk level
#         if score >= 12:
#             risk_level = "Normal nutritional status"
#         elif score >= 8:
#             risk_level = "At risk of malnutrition"
#         else:
#             risk_level = "Malnourished"
        
#         # Create screening result first
#         screening_data = {
#             'tool': data['tool_id'],
#             'total_score': score,
#             'risk_level': risk_level,
#             'raw_data': data
#         }
        
#         screening_serializer = ScreeningResultSerializer(data=screening_data)
#         if screening_serializer.is_valid():
#             screening_instance = screening_serializer.save(
#                 patient_id=self.kwargs['patient_id']
#             )
            
#             # Create MNA-SF specific data
#             mna_data = data.copy()
#             mna_data['screening_result'] = screening_instance.id
#             mna_serializer = self.get_serializer(data=mna_data)
            
#             if mna_serializer.is_valid():
#                 mna_serializer.save()
#                 return Response({
#                     'screening_result': screening_serializer.data,
#                     'mna_sf_data': mna_serializer.data
#                 }, status=status.HTTP_201_CREATED)
            
#             screening_instance.delete()
#             return Response(mna_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#         return Response(screening_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class GNRI_Create(generics.CreateAPIView):
#     serializer_class = GNRI_DataSerializer
    
#     def create(self, request, *args, **kwargs):
#         data = request.data
        
#         # Calculate Ideal Body Weight
#         height = float(data['height'])
#         if data['gender'] == 'M':
#             ibw = (height - 100 - ((height - 150) / 4))
#         else:
#             ibw = (height - 100 - ((height - 150) / 2))
        
#         # Calculate GNRI
#         weight_ratio = float(data['current_weight']) / ibw
#         gnri = (1.489 * float(data['serum_albumin'])) + (41.7 * weight_ratio)
        
#         # Determine risk level
#         if gnri > 98:
#             risk_level = "No Risk"
#         elif gnri > 91:
#             risk_level = "Low Risk"
#         elif gnri > 82:
#             risk_level = "Moderate Risk"
#         else:
#             risk_level = "Major Risk"
        
#         # Create screening result
#         screening_data = {
#             'tool': data['tool_id'],
#             'total_score': gnri,
#             'risk_level': risk_level,
#             'raw_data': data
#         }
        
#         screening_serializer = ScreeningResultSerializer(data=screening_data)
#         if screening_serializer.is_valid():
#             screening_instance = screening_serializer.save(
#                 patient_id=self.kwargs['patient_id']
#             )
            
#             # Create GNRI specific data
#             gnri_data = data.copy()
#             gnri_data['screening_result'] = screening_instance.id
#             gnri_data['calculated_gnri'] = gnri
#             gnri_serializer = self.get_serializer(data=gnri_data)
            
#             if gnri_serializer.is_valid():
#                 gnri_serializer.save()
#                 return Response({
#                     'screening_result': screening_serializer.data,
#                     'gnri_data': gnri_serializer.data
#                 }, status=status.HTTP_201_CREATED)
            
#             screening_instance.delete()
#             return Response(gnri_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#         return Response(screening_serializer.errors, status=status.HTTP_400_BAD_REQUEST)