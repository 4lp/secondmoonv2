from django.conf.urls import include, url
from rest_framework import routers
from .api import (ContactEmailAPI, PostViewSet, TagViewSet)
from django.urls import re_path 
from dynamic_preferences.api.viewsets import GlobalPreferencesViewSet
from rest_framework.permissions import AllowAny

GlobalPreferencesViewSet.permission_classes = [AllowAny]

router = routers.DefaultRouter()
router.register('tag', TagViewSet, 'tag')
router.register('post', PostViewSet, 'post')
router.register('global', GlobalPreferencesViewSet, 'global')

urlpatterns = [
    re_path("^contact/$", ContactEmailAPI.as_view()),
    re_path("^", include(router.urls)),
]
