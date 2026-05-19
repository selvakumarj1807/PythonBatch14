from django.urls import path

from . import views

urlpatterns = [
    path('', views.app02index)
]
