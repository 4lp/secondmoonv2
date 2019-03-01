from django.contrib import admin
from notes.models import Blogpost
from notes.models import Post
from notes.models import Tag 
# Register your models here.
admin.site.register(Blogpost)
admin.site.register(Tag)
admin.site.register(Post)

class BlogpostAdmin(admin.ModelAdmin):
    def save_model(self, request, instance, form, change):
        instance.owner = request.user
