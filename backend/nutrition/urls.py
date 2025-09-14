from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("equations", views.EquationViewSet)
router.register("calculations", views.CalculationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("drug-categories/", views.DrugCategoryListAPIView.as_view(), name="DrugCategoryListAPIView"),
    path("drugs/<int:category_id>", views.DrugListAPIView.as_view(), name="DrugListAPIView"),
    path("drug-details/<int:id>", views.DrugDetailAPIView.as_view(), name="DrugDetailAPIView"),
 
    path('equations-risk/', views.EquationListCreateView.as_view(), name='equation-list-create'),
    path('equations-risk/<int:pk>/', views.EquationRetrieveUpdateDestroyView.as_view(), name='equation-detail'),
    path('equations-risk/<int:pk>/calculate/', views.EquationCalculateView.as_view(), name='equation-calculate'),

]





# path("calc/", views.CalcAPIView.as_view(), name="api-calc"),