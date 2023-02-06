from django.db import models
from django import forms

from composite_field import CompositeField


from django_jsonform.models.fields import ArrayField

schema_mapping = {
    "MultipleChoiceQuestion": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
            "mark": {
                "type": "integer",
                "title": "Mark",
            },
            "prompt": {"title": "Prompt", "type": "string"},
	    
			"a": {"title": "A", "type": "string"},
			"is_true_a": {"title": "Is True", "type": "boolean"},
			
			"b": {"title": "B", "type": "string"},
			"is_true_b": {"title": "Is True", "type": "boolean"},
			
			"c": {"title": "C", "type": "string"},
			"is_true_c": {"title": "Is True", "type": "boolean"},
			
			"d": {"title": "D", "type": "string"},
			"is_true_d": {"title": "Is True", "type": "boolean"},
        },
        "required": ["prompt", "choices"],
    },
    "TrueFalseQuestion": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
            "mark": {
                "type": "integer",
                "title": "Mark",
            },
            "prompt": {"title": "Prompt", "type": "string"},
            "is_true": {"type": "boolean", "default":False},
        },
        "required": ["prompt"],
    },
}

class Subject(models.Model):
	name = models.CharField(max_length=255, default="Subject Name")

class Exam(models.Model):
	subject = models.ManyToManyField(Subject)
	
class Choice(CompositeField):
    choice = models.TextField(max_length=2048)
    is_correct = models.BooleanField(default=False)
    
class QuestionChoices(models.TextChoices):
    MultipleChoiceQuestion = 'MultipleChoiceQuestion'
    TrueFalseQuestion = 'TrueFalseQuestion'
    
class Question(models.Model):
    def default_schema():
        return schema_mapping
    
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    prompt = models.TextField(max_length=52000)
    type = models.CharField(choices=QuestionChoices.choices, default=QuestionChoices.MultipleChoiceQuestion, max_length = 80)
    
    question = models.JSONField(default=default_schema)