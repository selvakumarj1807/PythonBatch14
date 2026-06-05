from django.urls import path, include
from rest_framework.routers import DefaultRouter

from students.views import StaffViewSet, StudentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'staff', StaffViewSet, basename='staff')

urlpatterns = [
    path('', include(router.urls)),
]