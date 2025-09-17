from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.module_loading import import_string


class CategoryEquations(models.Model):
    
    name = models.CharField(max_length=100, unique=True)  
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Equation(models.Model):
    """
    تعريف المعادلات نفسها
    """
    name = models.CharField(max_length=100, unique=True)  # زي "BMI"
    code = models.CharField(max_length=100, unique=True)  # زي "bmi"
    category = models.ForeignKey(CategoryEquations, on_delete=models.CASCADE, related_name='equations', null=True, blank=True)
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
    





# class ScreeningTool(models.Model):
#     TOOL_TYPES = [
#         ('MNA_SF', 'Mini Nutritional Assessment - Short Form'),
#         ('MNA_LF', 'Mini Nutritional Assessment - Long Form'),
#         ('NRS_2002', 'Nutrition Risk Screening 2002'),
#         ('PG_SGA', 'Patient-Generated Subjective Global Assessment'),
#         ('MST', 'Malnutrition Screening Tool'),
#         ('MUST', 'Malnutrition Universal Screening Tool'),
#         ('GNRI', 'Geriatric Nutritional Risk Index'),
#         ('SNAQ', 'Short Nutritional Assessment Questionnaire'),
#         ('PYMS', 'Paediatric Yorkhill Malnutrition Score'),
#         ('STAMP', 'Screening Tool for the Assessment of Malnutrition in Pediatrics'),
#         ('STRONGkids', 'STRONGkids Screening Tool'),
#         ('NUTRIC', 'NUTRIC Score'),
#     ]
    
#     TARGET_POPULATIONS = [
#         ('geriatric', '>65 years'),
#         ('adult_hospitalized', 'Adult Hospitalized'),
#         ('cancer', 'Cancer Patient'),
#         ('adult_community', 'Adult (Community/Hospital)'),
#         ('pediatric', 'Pediatrics'),
#         ('critical', 'Adult, Critical ill'),
#     ]
    
#     name = models.CharField(max_length=100)
#     tool_type = models.CharField(max_length=20, choices=TOOL_TYPES, unique=True)
#     description = models.TextField()
#     target_population = models.CharField(max_length=20, choices=TARGET_POPULATIONS)
#     manual_version_url = models.URLField(blank=True)
#     digital_version_url = models.URLField(blank=True)
#     score_interpretation = models.TextField()
#     logic_reference = models.URLField(blank=True)
#     general_notes = models.TextField(blank=True)
    
#     def __str__(self):
#         return self.name

# class ScreeningResult(models.Model):
#     patient = models.ForeignKey('patients.Patient', on_delete=models.CASCADE)
#     tool = models.ForeignKey(ScreeningTool, on_delete=models.CASCADE)
#     date_administered = models.DateTimeField(auto_now_add=True)
#     total_score = models.DecimalField(max_digits=5, decimal_places=2)
#     risk_level = models.CharField(max_length=50)
#     raw_data = models.JSONField()  # Store all question responses
    
#     class Meta:
#         ordering = ['-date_administered']
    
#     def __str__(self):
#         return f"{self.patient} - {self.tool} - {self.date_administered}"

# # Specific tool models with their unique fields
# class MNA_SF_Data(models.Model):
#     screening_result = models.OneToOneField(ScreeningResult, on_delete=models.CASCADE)
#     has_appetite_loss = models.BooleanField()
#     weight_loss = models.DecimalField(max_digits=5, decimal_places=2)
#     mobility = models.CharField(max_length=20)
#     psychological_stress = models.BooleanField()
#     neuropsychological_problems = models.BooleanField()
#     bmi = models.DecimalField(max_digits=5, decimal_places=2)

# class GNRI_Data(models.Model):
#     screening_result = models.OneToOneField(ScreeningResult, on_delete=models.CASCADE)
#     gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female')])
#     height = models.DecimalField(max_digits=5, decimal_places=2)  # in cm
#     current_weight = models.DecimalField(max_digits=5, decimal_places=2)  # in kg
#     serum_albumin = models.DecimalField(max_digits=5, decimal_places=2)  # g/L
#     calculated_gnri = models.DecimalField(max_digits=5, decimal_places=2)

# class NUTRIC_Data(models.Model):
#     screening_result = models.OneToOneField(ScreeningResult, on_delete=models.CASCADE)
#     age = models.IntegerField()
#     apache_ii = models.IntegerField()
#     sofa = models.IntegerField()
#     comorbidities = models.IntegerField()
#     days_hospitalized = models.IntegerField()
#     il_6 = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
