from django_filters import rest_framework as filters
from .models import DrugCategory

class DrugCategoryFilter(filters.FilterSet):
    category_name = filters.CharFilter(field_name='name', lookup_expr='icontains')
    drug_name = filters.CharFilter(field_name='drugs__name', lookup_expr='icontains')
    drug_id = filters.NumberFilter(field_name='drugs__id')
    
    class Meta:
        model = DrugCategory
        fields = ['category_name', 'drug_name', 'drug_id']