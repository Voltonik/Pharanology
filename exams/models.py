from django.db import models

from accounts.models import SchoolGrades

schema_mapping = {
    "MultipleChoiceQuestion": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
            "a": {"title": "A", "type": "string"},
            "is_true_a": {"title": "Is True", "type": "boolean"},
                
            "b": {"title": "B", "type": "string"},
            "is_true_b": {"title": "Is True", "type": "boolean"},
            
            "c": {"title": "C", "type": "string"},
            "is_true_c": {"title": "Is True", "type": "boolean"},
            
            "d": {"title": "D", "type": "string"},
            "is_true_d": {"title": "Is True", "type": "boolean"},
        },
        "required": [],
    },
    "TrueFalseQuestion": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
            "is_true": {"type": "boolean", "default":False},
        },
        "required": [],
    },
}

class Subject(models.Model):
    name = models.CharField(max_length=255, default="Subject Name")

    def __str__(self):
        return self.name

class Exam(models.Model):
    subject = models.OneToOneField(Subject, on_delete=models.CASCADE)
    scheduled_for = models.DateTimeField()
    for_grade = models.CharField(choices=SchoolGrades.choices, default=SchoolGrades.G01, max_length = 3)
	
    def __str__(self):
        return f"{self.subject} ({self.for_grade})  {self.scheduled_for}"
    
class QuestionChoices(models.TextChoices):
    MultipleChoiceQuestion = 'MultipleChoiceQuestion'
    TrueFalseQuestion = 'TrueFalseQuestion'
    
class Question(models.Model):
    def default_schema():
        return schema_mapping
    
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    prompt = models.TextField(max_length=52000)
    mark = models.DecimalField(default=0, max_digits=4, decimal_places=3)

    type = models.CharField(choices=QuestionChoices.choices, default=QuestionChoices.MultipleChoiceQuestion, max_length = 80)
    question = models.JSONField(default=default_schema)