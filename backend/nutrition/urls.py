from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EquationViewSet, CalculationViewSet

router = DefaultRouter()
router.register("equations", EquationViewSet)
router.register("calculations", CalculationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]





# path("calc/", views.CalcAPIView.as_view(), name="api-calc"),