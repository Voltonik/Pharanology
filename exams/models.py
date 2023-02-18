from django.db import models
from django.core.exceptions import ValidationError

from datetime import timedelta

from accounts.enums import SchoolGrades
from .enums import *

class Subject(models.Model):
    name = models.CharField(max_length=255, default="Subject Name")

    def __str__(self):
        return self.name

class Exam(models.Model):
    state = models.CharField(choices=ExamState.choices, default=ExamState.Scheduled, max_length=16)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=False)
    scheduled_for = models.DateTimeField()
    for_grade = models.CharField(choices=SchoolGrades.choices, default=SchoolGrades.G01, max_length=3)
    duration = models.DecimalField(default=2, max_digits=5, decimal_places=3)
    results_date = models.DateTimeField()
    broadcast_results_date = models.BooleanField(default=True)
    full_history_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.subject} ({self.for_grade})  {self.scheduled_for}"
    
    def clean(self):
        if self.results_date <= self.scheduled_for + timedelta(hours=float(self.duration)):
            raise ValidationError("Results date cannot be before the exam ends.")
        
    def get_results_date(self):
        return "Exam results date not public" if not self.broadcast_results_date else f"Exam results will be ready on {self.results_date}"
    
    def grade(self, chosen, questions):
        marks = 0
        corrections = []
        max_marks = 0

        for i in range(len(questions)):
            question = questions[i]
            max_marks += float(question.mark)
            
            if question.type == 0:
                choices_answers = [question.is_true_A, question.is_true_B, question.is_true_C, question.is_true_D]
                
                chosen_mcq = chosen.get(f"{question.pk}")
                
                corrections.append(choices_answers.index(True))
                    
                if (f"choice_A_{i}" == chosen_mcq and choices_answers[0]) or (f"choice_B_{i}" == chosen_mcq and choices_answers[1]) or (f"choice_C_{i}" == chosen_mcq and choices_answers[2]) or (f"choice_D_{i}" == chosen_mcq and choices_answers[3]):
                    marks += float(question.mark)   
            elif question.type == 1:
                chosen_truefalse = chosen.get(f"{question.pk}")
                
                corrections.append(question.is_true)
                
                if f"is_true_{i}" == chosen_truefalse and question.is_true:
                    marks += float(question.mark)
                    
        
        return (marks, max_marks, corrections)

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