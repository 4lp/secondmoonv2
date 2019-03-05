from rest_framework import serializers
from .models import Blogpost
from .models import Tag
from .models import Post
from django.conf import settings
import requests

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class BlogpostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%d-%m-%Y %I:%M%p')
    class Meta:
        model = Blogpost
        fields = ('id', 'text', 'title', 'image', 'created_at','tags')
        
class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('id', 'name', 'text', 'image', 'path', 'tags')

class ContactEmailSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    reply = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    zip_code = serializers.CharField(required=True)
    user = serializers.CharField(required=False, allow_blank=True)
    captcha = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        if data['user']:
            return data
        if data['captcha']:
            recaptcha_response = data['captcha']
            captcha_data = {
                'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                'response': recaptcha_response
            }
            r = requests.post('https://www.google.com/recaptcha/api/siteverify', 
                    data=captcha_data)
            result = r.json()
            if result['success']:
                return data
        raise serializers.ValidationError('Invalid ReCAPTCHA. Please try again')
