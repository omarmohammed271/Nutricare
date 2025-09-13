# app/serializers.py
from rest_framework import serializers



class CalcRequestSerializer(serializers.Serializer):
    equation = serializers.CharField()  # e.g. "bmi", "ibw_hamwi", "mifflin", ...
    # generic inputs: allow arbitrary extras
    # we'll accept them via a dict field
    inputs = serializers.DictField(child=serializers.CharField(), required=False)
