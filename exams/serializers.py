from rest_framework import serializers

from .models import *

class ExamSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
	
    class Meta:
        model = Exam
        fields = ("pk",
                  "subject",
                  "state",
                  "scheduled_for",
                  "for_grade",
                  "duration")


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("pk",
                  "prompt", 
                  "mark", 
                  "type", 
                  "choice_A", 
                  "choice_B", 
                  "choice_C", 
                  "choice_D")