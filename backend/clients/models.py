from django.db import models
from django.contrib.auth import get_user_model
from datetime import date
User = get_user_model()

# Create your models here.
PHYSICAL_ACTIVITY_CHOICES = [
    ("sedentary", "Sedentary (little or no exercise) — 1.2"),
    ("light", "Lightly active (30 min moderate, 1-3 days/week) — 1.375"),
    ("moderate", "Moderately active (45 min, 3-5 days/week) — 1.55"),
    ("very_active", "Very active (1 hr, 6-7 days/week) — 1.725"),
    ("extra", "Extra active (hard training + weight lifting) — 1.9"),
]

PHYSICAL_ACTIVITY_FACTORS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "very_active": 1.725,
    "extra": 1.9,
}

# 🔹 خيارات عامل الإجهاد (Stress Factor)
STRESS_FACTOR_CHOICES = [
    ("minor_surgery", "Minor Surgery — 1.1"),
    ("major_surgery", "Major Surgery — 1.2"),
    ("skeletal_trauma", "Skeletal Trauma — 1.2"),
    ("blunt_trauma", "Blunt Trauma — 1.35"),
    ("closed_head_injury", "Closed Head Injury — 1.4"),
    ("mild_infection", "Mild Infection — 1.2"),
    ("moderate_infection", "Moderate Infection — 1.4"),
    ("severe_infection", "Severe Infection — 1.8"),
    ("starvation", "Starvation — 0.85"),
    ("burns_lt_20", "Burns <20% TBSA — 1.5"),
    ("burns_20_40", "Burns 20%-40% TBSA — 1.8"),
    ("burns_gt_40", "Burns >40% TBSA — 2.0"),
]

STRESS_FACTOR_VALUES = {
    "minor_surgery": 1.1,
    "major_surgery": 1.2,
    "skeletal_trauma": 1.2,
    "blunt_trauma": 1.35,
    "closed_head_injury": 1.4,
    "mild_infection": 1.2,
    "moderate_infection": 1.4,
    "severe_infection": 1.8,
    "starvation": 0.85,
    "burns_lt_20": 1.5,
    "burns_20_40": 1.8,
    "burns_gt_40": 2.0,
}

class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='clients')
    name = models.CharField(max_length=100,unique=True)
    gender = models.CharField(max_length=10,choices=[('male','Male'),('female','Female')],blank=True,null=True)
    date_of_birth = models.DateField(blank=True,null=True)
    weight = models.FloatField(help_text="Weight in kg",blank=True,null=True)
    height = models.FloatField(help_text="Height in m",blank=True,null=True)
    physical_activity = models.CharField(
        max_length=20, choices=PHYSICAL_ACTIVITY_CHOICES
    )
    ward_type = models.CharField(
        max_length=50,
        choices=[
            ("outpatient", "Out-patient"),
            ("icu", "ICU"),
            ("medical", "Medical Ward"),
            ("cardiac", "Cardiac Ward"),
            ("others", "Others"),
        ],blank=True,null=True
    )
    stress_factor = models.CharField(
        max_length=30,
        choices=STRESS_FACTOR_CHOICES,
        null=True,
        blank=True,
    )

    feeding_type = models.CharField(
        max_length=50,
        choices=[
            ("oral", "Oral"),
            ("enteral_parenteral", "Enteral & Parenteral"),
            ("tpn", "TPN")
        ],blank=True,null=True
    )
    is_finished = models.BooleanField(default=False)
    @property
    def age(self):
        today = date.today()
        return today.year - self.date_birth.year - (
            (today.month, today.day) < (self.date_birth.month, self.date_birth.day)
        )
    def __str__(self):
        return self.name

class LabResult(models.Model):
    
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="lab_results")
    follow_up = models.ForeignKey('FollowUp', on_delete=models.CASCADE, related_name="lab_results", blank=True, null=True)
    test_name = models.CharField(max_length=100,blank=True,null=True)
    result = models.CharField(max_length=50,blank=True,null=True)
    reference_range = models.CharField(max_length=50,blank=True,null=True)
    interpretation = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='lab_reports/', blank=True, null=True)
    date = models.DateField()
    def __str__(self):
        return f"{self.test_name} - {self.client.name}"


class Medication(models.Model):
    
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="medications",)
    follow_up = models.ForeignKey('FollowUp', on_delete=models.CASCADE, related_name="medications", blank=True, null=True)
    name = models.CharField(max_length=100,blank=True,null=True)
    dosage = models.CharField(max_length=100,blank=True,null=True)
    notes = models.TextField(blank=True, null=True)    

    def __str__(self):
        return f"{self.name} - {self.client.name}"



class FollowUp(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="follow_ups")
    date = models.DateField(blank=True, null=True)
    weight = models.FloatField(help_text="Weight in kg",blank=True,null=True)
    height = models.FloatField(help_text="Height in m",blank=True,null=True)
    physical_activity = models.CharField(
        max_length=20, choices=PHYSICAL_ACTIVITY_CHOICES,blank=True,null=True
    )
    ward_type = models.CharField(
        max_length=50,
        choices=[
            ("outpatient", "Out-patient"),
            ("icu", "ICU"),
            ("medical", "Medical Ward"),
            ("cardiac", "Cardiac Ward"),
            ("others", "Others"),
        ],blank=True,null=True
    )
    stress_factor = models.CharField(
        max_length=30,
        choices=STRESS_FACTOR_CHOICES,
        null=True,
        blank=True,
    )

    feeding_type = models.CharField(
        max_length=50,
        choices=[
            ("oral", "Oral"),
            ("enteral_parenteral", "Enteral & Parenteral"),
            ("tpn", "TPN")
        ],blank=True,null=True
    )
    is_finished = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Follow-up for {self.client.name} on {self.date}"


# class MealPlan(models.Model):
#     
#     client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="meal_plans")
#     description = models.TextField()
#     total_calories = models.FloatField(null=True, blank=True)
class Appointment(models.Model):
    
    patient_name = models.ForeignKey(Client, on_delete=models.CASCADE,blank=True, null=True)
    doctor_name = models.ForeignKey(User, on_delete=models.CASCADE,related_name='appointments')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    APPOINTMENT_TYPE_CHOICES = [
        ('initial', 'initial'),
        ('follow_up', 'follow_up'),
    ]
    appointment_type = models.CharField(max_length=20, choices=APPOINTMENT_TYPE_CHOICES)

    STATUS_CHOICES = [
        ('next', 'next'),
        ('completed', 'completed'),
        ('cancelled', 'cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='next')

    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient_name} - {self.doctor_name} ({self.start_time})"
