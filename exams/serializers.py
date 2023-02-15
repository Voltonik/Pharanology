from rest_framework import serializers
from rest_framework.validators import UniqueValidator, ValidationError

from .models import *

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'