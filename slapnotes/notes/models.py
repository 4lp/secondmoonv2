from django.db import models
from django.contrib.auth.models import User
from tinymce.models import HTMLField

class Tag(models.Model):
    name = models.CharField(max_length=255, default='')
 
    def __str__(self):
        return self.name

class Blogpost(models.Model):
    title = models.CharField(max_length=255, default='')
    text = HTMLField()
    image = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)
    tags = models.ManyToManyField(Tag)
    
    def __str__(self):
        return self.title

class Post(models.Model):
    name = models.CharField(max_length=255, default='')
    path = models.CharField(max_length=255, default='')
    text = HTMLField()
    image = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)
    tags = models.ManyToManyField(Tag)
    
    def __str__(self):
        return self.name
