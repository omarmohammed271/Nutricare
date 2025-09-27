from django.db import models

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
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10,choices=[('male','Male'),('female','Female')])
    age = models.IntegerField(blank=True,null=True)
    date_of_birth = models.DateField()
    weight = models.FloatField(help_text="Weight in kg")
    height = models.FloatField(help_text="Height in cm")
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
        ]
    )
    stress_factor = models.CharField(
        max_length=30,
        choices=STRESS_FACTOR_CHOICES,
        null=True,
        blank=True
    )

    feeding_type = models.CharField(
        max_length=50,
        choices=[
            ("oral", "Oral"),
            ("enteral_parenteral", "Enteral & Parenteral"),
            ("tpn", "TPN")
        ]
    )