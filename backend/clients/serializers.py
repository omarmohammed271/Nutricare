from rest_framework import serializers
from .models import Client, LabResult, Medication,Appointment,FollowUp


# class MealPlanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MealPlan
#         exclude = ('client','user')



class BiochemicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResult
        fields = ['id','test_name', 'result', 'reference_range', 'interpretation', 'file', 'date']

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        exclude = ('client', 'follow_up')

class FollowUpSerializer(serializers.ModelSerializer):
    lab_results = BiochemicalSerializer(many=True, required=False)
    medications = MedicationSerializer(many=True, required=False)

    class Meta:
        model = FollowUp
        exclude = ('client',)    
   
    def create(self, validated_data):
        print('-'*50)
        print(validated_data)
        print('-'*50)
        lab_results_data = validated_data.pop('lab_results', [])
        meds_data = validated_data.pop('medications', [])
        print('-'*50)
        print('lab:', lab_results_data)
        print('med:', meds_data)
        print('-'*50)
        
        client = self.context['client']  
        follow_up = FollowUp.objects.create(client=client, **validated_data)

        for lab in lab_results_data:
            # إزالة follow_up و client إذا كانا موجودين
            lab.pop('follow_up', None)
            lab.pop('client', None)
            LabResult.objects.create(client=client, follow_up=follow_up, **lab)

        for med in meds_data:
            # إزالة follow_up و client إذا كانا موجودين
            med.pop('follow_up', None)
            med.pop('client', None)
            Medication.objects.create(client=client, follow_up=follow_up, **med)

        return follow_up
    def update(self, instance, validated_data):
        lab_results_data = validated_data.pop('lab_results', [])
        meds_data = validated_data.pop('medications', [])

        # تحديث بيانات المتابعة الأساسية
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # حذف التحاليل السابقة وإعادة إنشائها
        instance.lab_results.all().delete()
        for lab_data in lab_results_data:
            lab_data.pop('follow_up', None)
            lab_data.pop('client', None)
            LabResult.objects.create(client=instance.client, follow_up=instance, **lab_data)

        # حذف الأدوية السابقة وإعادة إنشائها
        instance.medications.all().delete()
        for med_data in meds_data:
            med_data.pop('follow_up', None)
            med_data.pop('client', None)
            Medication.objects.create(client=instance.client, follow_up=instance, **med_data)

        return instance

class ClientSerializer(serializers.ModelSerializer):
    lab_results = BiochemicalSerializer(many=True, required=False)   
    medications = MedicationSerializer(many=True, required=False) 
    follow_ups = FollowUpSerializer(many=True, read_only=True)   

    class Meta:
        model = Client
        fields = [
            'id','name','gender','age','date_of_birth',
            'weight','height','physical_activity','ward_type',
            'stress_factor','feeding_type','lab_results','medications','follow_ups','is_finished'
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
        meds_data = validated_data.pop('medications', [])

        # تحديث بيانات العميل الأساسية
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # استراتيجية بسيطة وفعالة: احذف كل التحاليل القديمة وأنشئ الجديدة
        instance.lab_results.all().delete()
        for lab_data in lab_results_data:
            LabResult.objects.create(client=instance, **lab_data)

        # نفس الشيء للأدوية
        instance.medications.all().delete() 
        for med_data in meds_data:
            Medication.objects.create(client=instance, **med_data)

        return instance


class ClientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name'] 

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = ClientNameSerializer(read_only=True)  
    patient_name_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source='patient_name', write_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient_name',    
            'patient_name_id', 
            'start_time',
            'end_time',
            'appointment_type',
            'status',
            'notes',
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        appointment = Appointment.objects.create(doctor_name=user, **validated_data)
        return appointment    
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance



