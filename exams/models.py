from django.db import models

from accounts.enums import SchoolGrades

QuestionTypes = [(0, "Multiple Choice"), (1, "True or False")]

class Subject(models.Model):
    name = models.CharField(max_length=255, default="Subject Name")

    def __str__(self):
        return self.name

class Exam(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=False)
    scheduled_for = models.DateTimeField()
    for_grade = models.CharField(choices=SchoolGrades.choices, default=SchoolGrades.G01, max_length=3)
    duration = models.DecimalField(default=2, max_digits=5, decimal_places=3)
    
    def __str__(self):
        return f"{self.subject} ({self.for_grade})  {self.scheduled_for}"

class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    prompt = models.TextField(max_length=52000)
    mark = models.DecimalField(default=0, max_digits=7, decimal_places=3)

    type = models.IntegerField(choices=QuestionTypes, default=0, null=False)

    # MCQ
    choice_A = models.TextField(max_length=1024, blank=True)
    is_true_A = models.BooleanField(default=False)

    choice_B = models.TextField(max_length=1024, blank=True)
    is_true_B = models.BooleanField(default=False)

    choice_C = models.TextField(max_length=1024, blank=True)
    is_true_C = models.BooleanField(default=False)

    choice_D = models.TextField(max_length=1024, blank=True)
    is_true_D = models.BooleanField(default=False)

    # True or False
    is_true = models.BooleanField(default=False)