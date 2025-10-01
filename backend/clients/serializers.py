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

    def update(self, instance, validated_data):
        lab_results_data = validated_data.pop('lab_results', [])
        meds_data        = validated_data.pop('medications', [])

        # حدّث بيانات العميل الأساسية
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # حدّث التحاليل
        existing_labs = {lab.id: lab for lab in instance.lab_results.all()}
        for lab in lab_results_data:
            lab_id = lab.get('id', None)
            if lab_id and lab_id in existing_labs:
                # حدّث التحليل الموجود
                for attr, value in lab.items():
                    setattr(existing_labs[lab_id], attr, value)
                existing_labs[lab_id].save()
            else:
                # أضف تحليل جديد
                LabResult.objects.create(client=instance, **lab)

        # حدّث الأدوية
        existing_meds = {med.id: med for med in instance.medications.all()}
        for med in meds_data:
            med_id = med.get('id', None)
            if med_id and med_id in existing_meds:
                # حدّث الدواء الموجود
                for attr, value in med.items():
                    setattr(existing_meds[med_id], attr, value)
                existing_meds[med_id].save()
            else:
                # أضف دواء جديد
                Medication.objects.create(client=instance, **med)

        return instance




