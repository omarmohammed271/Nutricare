from django.contrib import admin
from .models import Client, LabResult, Medication,FollowUp
# Register your models here.

admin.site.register(Client)
admin.site.register(LabResult)
admin.site.register(Medication)
admin.site.register(FollowUp)