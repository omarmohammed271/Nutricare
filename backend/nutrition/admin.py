from django.contrib import admin
from .models import *

@admin.register(Equation)
class EquationAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "function_path")
    search_fields = ("name", "code")


@admin.register(Calculation)
class CalculationAdmin(admin.ModelAdmin):
    list_display = ("equation", "created_at")
    search_fields = ("equation__name",)
    readonly_fields = ("result", "created_at")

@admin.register(DrugCategory)
class DrugCategoryAdmin(admin.ModelAdmin):
    list_display = ("id","name")
   
@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    list_display = ("id","name", "category")
    search_fields = ("name", "category__name")



