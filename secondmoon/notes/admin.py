from django.contrib import admin
from notes.models import Post
from notes.models import Tag 
# Register your models here.
admin.site.register(Tag)
admin.site.register(Post)
