from rest_framework import serializers
from .models import Client, LabResult, Medication


# class MealPlanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MealPlan
#         exclude = ('client','user')



class BiochemicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        exclude = ('client',)

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        exclude = ('client',)

class ClientSerializer(serializers.ModelSerializer):
    lab_results = BiochemicalSerializer(many=True, required=False)   
    medications = MedicationSerializer(many=True, required=False)    

    class Meta:
        model = Client
        fields = [
            'id','name','gender','age','date_of_birth',
            'weight','height','physical_activity','ward_type',
            'stress_factor','feeding_type','lab_results','medications'
        ]

    def create(self, validated_data):
        
        lab_results_data = validated_data.pop('lab_results', [])
        meds_data        = validated_data.pop('medications', [])
        
        user   = self.context['request'].user
        client = Client.objects.create(user=user, **validated_data)

        # أضف التحاليل
        for lab in lab_results_data:
            LabResult.objects.create(client=client, **lab)

        # أضف الأدوية
        for med in meds_data:
            Medication.objects.create(client=client, **med)

        return client
