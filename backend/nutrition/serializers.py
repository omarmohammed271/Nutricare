from rest_framework import serializers
from .models import Equation, Calculation


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
