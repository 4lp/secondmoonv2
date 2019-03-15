from django.db import models
from tinymce.models import HTMLField

class Tag(models.Model):
    name = models.CharField(max_length=255, default='')
 
    def __str__(self):
        return self.name

class Post(models.Model):
    name = models.CharField(max_length=255, default='')
    path = models.CharField(max_length=255, default='')
    text = HTMLField()
    image = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag)
    
    def __str__(self):
        return self.name
