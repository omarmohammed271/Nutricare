from rest_framework import serializers
from .models import Equation, Calculation,Drug, DrugCategory


class EquationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equation
        fields = ["id", "name", "code", "function_path", "description"]


class CalculationSerializer(serializers.ModelSerializer):
    result = serializers.JSONField(read_only=True)

    class Meta:
        model = Calculation
        fields = ["id", "equation", "inputs", "result", "created_at"]

    def create(self, validated_data):
        calc = Calculation.objects.create(**validated_data)
        calc.run()  # يشغّل المعادلة أوتوماتيك
        return calc


class DrugCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugCategory
        fields = ['id', 'name']


class DrugSerializer(serializers.ModelSerializer):
    category = DrugCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=DrugCategory.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Drug
        fields = ['id', 'name', 'drug_effect', 'nutritional_implications', 'category', 'category_id']