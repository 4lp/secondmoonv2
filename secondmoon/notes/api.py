from .models import Tag
from .models import Post 
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django import forms
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from django_filters import rest_framework
from .serializers import (ContactEmailSerializer, PostSerializer, TagSerializer)

class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_fields = ('tags__name','path')
    queryset = Post.objects.all().order_by('-created_at')
    pagination_class = PageNumberPagination 

class ContactEmailAPI(generics.GenericAPIView):
    serializer_class = ContactEmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data['name']
        email = serializer.validated_data['reply']
        message = serializer.validated_data['message']
        email_text = "You received a message from {name} at {email}: {message}".format(
                name=name, email=email, message=message)
        send_mail("Contact email from Second Moon Records", email_text, getattr(settings, 'DEFAULT_FROM_EMAIL'), [getattr(settings, 'DEFAULT_FROM_EMAIL')])
        return Response(serializer.data)
