from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("equations", views.EquationViewSet)
router.register("calculations", views.CalculationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    
    path("drugs/", views.DrugCategoryListAPIView.as_view(), name="DrugListAPIView"),
    path("drug-details/<int:id>", views.DrugDetailAPIView.as_view(), name="DrugDetailAPIView"),
 
  

]





# path("calc/", views.CalcAPIView.as_view(), name="api-calc"),