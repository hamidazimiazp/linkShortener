from django.contrib import admin
from .models import Shortener


@admin.register(Shortener)
class manageShortener(admin.ModelAdmin):
    pass