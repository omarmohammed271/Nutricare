from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from drf_spectacular.utils import extend_schema
from .models import Client
from .serializers import ClientSerializer

@extend_schema(
    request=ClientSerializer,          # يوضّح شكل الـ Request Body
    responses=ClientSerializer,        # يوضّح شكل الـ Response
    description="Create new client with all tabs (assessment, biochemical, medication, meal plan)."
)
class ClientListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # 🔹 عند طلب GET → يرجع عملاء المستخدم الحالي فقط
    def get_queryset(self):
        return Client.objects.filter(user=self.request.user)

    # 🔹 عند طلب POST → ينشئ عميل جديد مع التابات
    def perform_create(self, serializer):
        serializer.save()   # الـ user يضاف داخل serializer.create