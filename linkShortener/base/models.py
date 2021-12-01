from django.db import models

class Shortener(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    times_follow = models.PositiveIntegerField(default=0)
    long_url = models.URLField(max_length=200)
    short_url = models.CharField(max_length=15, unique=True, blank=True)
    
    
    def __str__(self):
        return f"{self.short_url} | {self.long_url}"
    
    
    class Meta:
        ordering = ['-created']