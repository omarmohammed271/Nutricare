from django.contrib import admin
from .models import Client, LabResult, Medication,FollowUp
# Register your models here.

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )
    search_fields = ('name',)
    list_filter = ('date_of_birth',)
admin.site.register(LabResult)
admin.site.register(Medication)

@admin.register(FollowUp)
class FollowUpAdmin(admin.ModelAdmin):
    list_display = ('id','client', 'date', 'notes')
    search_fields = ('client__name', 'notes')
    list_filter = ('date',)




