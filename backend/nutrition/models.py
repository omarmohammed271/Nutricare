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
