from rest_framework import serializers
from .models import *


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


class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = ['id', 'name', 'drug_effect', 'nutritional_implications']


class DrugCategorySerializer(serializers.ModelSerializer):
    drugs = DrugSerializer(many=True, read_only=True)
    class Meta:
        model = DrugCategory
        fields = ['id', 'name','drugs']





class ScreeningToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScreeningTool
        fields = '__all__'

class ScreeningResultSerializer(serializers.ModelSerializer):
    tool_name = serializers.CharField(source='tool.name', read_only=True)
    
    class Meta:
        model = ScreeningResult
        fields = '__all__'
        read_only_fields = ('patient', 'date_administered')

class MNA_SF_DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MNA_SF_Data
        fields = '__all__'

class GNRI_DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GNRI_Data
        fields = '__all__'

class NUTRIC_DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NUTRIC_Data
        fields = '__all__'
