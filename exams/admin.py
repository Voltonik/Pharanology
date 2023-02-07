from django.contrib import admin
from django import forms
from django.core.exceptions import ValidationError

from .models import *

class QuestionAdminForm(forms.ModelForm):
    class Meta:
        widgets = {
            "type": forms.Select(
                attrs={
                    "--hideshow-fields": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D, is_true",
                    "--show-on-0": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D",
                    "--show-on-1": "is_true",
                }
            ),
        }
        
    class Media:
        js = ("js/hideshow.js",)
        
    def clean(self):
        cleaned_data = super(QuestionAdminForm, self).clean()
        
        type = cleaned_data.get('type')
        
        if type == QuestionTypes[0][0]:
            self.validate_required_field(cleaned_data, ['choice_A', 'choice_B', 'choice_C', 'choice_D'])
            
            true_choices = [is_true for is_true in [cleaned_data.get('is_true_A'), cleaned_data.get('is_true_B'), cleaned_data.get('is_true_C'), cleaned_data.get('is_true_D')] if is_true == True]
            
            if len(true_choices) is not 1:
                raise ValidationError('Only one choice should be correct.')
            
        return self.cleaned_data
        
    def validate_required_field(self, cleaned_data, field_names=[], message="This field is required."):
        for field_name in field_names:
            if(field_name in cleaned_data and (cleaned_data[field_name] is None or cleaned_data[field_name] is '')):
                self._errors[field_name] = self.error_class([message])
                del cleaned_data[field_name]

class QuestionAdmin(admin.ModelAdmin):
    form = QuestionAdminForm

class QuestionInline(admin.StackedInline):
    model = Question
    form = QuestionAdminForm
    extra = 0

class ExamAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline
    ]

admin.site.register(Subject)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)