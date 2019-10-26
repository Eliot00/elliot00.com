from django.urls import path
from . import views


app_name = 'userprofile'

urlpatterns = [
    path('profile/<int:id>/', views.userprofile, name='userprofile'),
    path('change-profile/<int:id>/', views.change_userprofile, name='change_userprofile'),
]