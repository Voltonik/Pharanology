from rest_framework import serializers
from .models import *

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser 
        fields = ('pk', 
                  'username', 
                  'email', 
                  'id', 
                  'first_name', 
                  'last_name', 
                  'role',)

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser 
        fields = ('pk', 
                  'username', 
                  'email', 
                  'id', 
                  'grade', 
                  'available_exams', 
                  'upcoming_exams', 
                  'exams_history')