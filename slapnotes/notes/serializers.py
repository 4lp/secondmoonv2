from rest_framework import serializers
from .models import Tag
from .models import Post
from django.conf import settings
import requests

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')
       
class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('id', 'name', 'text', 'image', 'path', 'tags')

class ContactEmailSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    reply = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)
    captcha = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        if data['captcha']:
            recaptcha_response = data['captcha']
            captcha_data = ***REMOVED***
                'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                'response': recaptcha_response
            ***REMOVED***
            r = requests.post('https://www.google.com/recaptcha/api/siteverify', 
                    data=captcha_data)
            result = r.json()
            if result['success']:
                return data
        raise serializers.ValidationError('Invalid ReCAPTCHA. Please try again')
