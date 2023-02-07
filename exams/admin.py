from django.contrib import admin
from django import forms

from utils.widgets import *

from .models import *

class QuestionAdminForm(forms.ModelForm):
    class Meta:
        widgets = {
            "type": forms.Select(
                attrs= {
                    "--hideshow-fields": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D, is_true",
                    "--show-on-0": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D",
                    "--show-on-1": "is_true",
                }
            ),
        }
    
    class Media:
        js = ("js/hideshow.js",)

class QuestionAdmin(admin.ModelAdmin):
    form = QuestionAdminForm

class QuestionInline(admin.StackedInline):
    model = Question
    form = QuestionAdminForm

class ExamAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline
    ]
    
admin.site.register(Subject)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)