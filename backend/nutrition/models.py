from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.module_loading import import_string


class Equation(models.Model):
    """
    تعريف المعادلات نفسها
    """
    name = models.CharField(max_length=100, unique=True)  # زي "BMI"
    code = models.CharField(max_length=100, unique=True)  # زي "bmi"
    function_path = models.CharField(
        max_length=255,
        help_text="Python path e.g. app.utils.bmi"
    )
    description = models.TextField(blank=True, null=True)

    def get_function(self):
        """يحاول يجيب الفنكشن من الـ path"""
        return import_string(self.function_path)

    def __str__(self):
        return f"{self.name} ({self.code})"


class Calculation(models.Model):
    """
    تخزين العمليات اللي اتعملت
    """
    equation = models.ForeignKey(Equation, on_delete=models.CASCADE)
    inputs = models.JSONField()
    result = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def run(self):
        func = self.equation.get_function()
        self.result = func(**self.inputs)
        self.save()
        return self.result

    def __str__(self):
        return f"{self.equation.name} - {self.created_at.date()}"



class DrugCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return self.name

class Drug(models.Model):
    category = models.ForeignKey(DrugCategory, on_delete=models.CASCADE, related_name='drugs')
    name = models.CharField(max_length=200)
    drug_effect = models.TextField(blank=True, null=True)
    nutritional_implications = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category.name})"
    





class ScreeningTool(models.Model):
    TOOL_TYPES = [
        ('MNA_SF', 'Mini Nutritional Assessment - Short Form (MNA SF)'),
        ('MNA_LF', 'Mini Nutritional Assessment Long Form (MNA LF)'),
        ('NRS_2002', 'Nutrition Risk Screening 2002 (NRS 2002)'),
        ('PG_SGA', 'Patient-Generated Subjective Global Assessment (PG-SGA)'),
        ('MST', 'Malnutrition Screening Tool (MST)'),
        ('MUST', 'Malnutrition Universal Screening Tool (MUST)'),
        ('GNRI', 'Geriatric Nutritional Risk Index (GNRI)'),
        ('SNAQ', 'Short Nutritional Assessment Questionnaire (SNAQ)'),
        ('PYMS', 'Paediatric Yorkhill Malnutrition Score (PYMS)'),
        ('STAMP', 'Screening Tool for the Assessment of Malnutrition in Pediatrics (STAMP)'),
        ('STRONGkids', 'STRONGkids – Screening Tool for Risk on Nutritional Status and Growth'),
        ('NUTRIC', 'NUTRIC Score – Nutrition Risk in the Critically Ill'),
    ]
    
    TARGET_POPULATIONS = [
        ('ELDERLY', '>65 years'),
        ('ADULT_HOSPITALIZED', 'Adult Hospitalized'),
        ('ADULT_COMMUNITY', 'Adult (Community/Hospital)'),
        ('CANCER', 'Cancer Patient'),
        ('PEDIATRICS', 'Pediatrics'),
        ('CRITICAL_ILL', 'Adult, Critical ill'),
    ]
    
    name = models.CharField(max_length=100, choices=TOOL_TYPES)
    target_population = models.CharField(max_length=50, choices=TARGET_POPULATIONS)
    definition = models.TextField()
    manual_version_url = models.URLField(blank=True)
    automated_version_url = models.URLField(blank=True)
    score_interpretation = models.TextField()
    logic_reference = models.URLField(blank=True)
    general_notes = models.TextField(blank=True)
    
    def __str__(self):
        return self.get_name_display()

class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    height = models.FloatField(help_text="Height in cm", null=True, blank=True)
    weight = models.FloatField(help_text="Weight in kg", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def age(self):
        import datetime
        return int((datetime.date.today() - self.date_of_birth).days / 365.25)

class ScreeningResult(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='screening_results')
    tool = models.ForeignKey(ScreeningTool, on_delete=models.CASCADE)
    score = models.FloatField(null=True, blank=True)
    risk_level = models.CharField(max_length=50, blank=True)
    completed_at = models.DateTimeField(auto_now_add=True)
    data = models.JSONField(default=dict)  # Store all the answers and calculations
    
    class Meta:
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.patient} - {self.tool} - {self.completed_at.date()}"