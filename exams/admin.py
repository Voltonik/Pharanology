from django.contrib import admin
from django import forms
from django.core.exceptions import ValidationError
from django.contrib import messages
from django.core.mail import send_mail

from .tasks import exam_chain
from .models import *

from datetime import timedelta, datetime

from accounts.models import StudentUser

class QuestionAdminForm(forms.ModelForm):
    class Meta:
        widgets = {
            "type": forms.Select(
                attrs={
                    "--hideshow-fields": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D, is_true",
                    "--show-on-0": "choice_A, choice_B, choice_C, choice_D, is_true_A, is_true_B, is_true_C, is_true_D",
                    "--show-on-1": "is_true",
                }
            )
        }
        
    class Media:
        js = ("js/hideshow.js",)
        
    def clean(self):
        cleaned_data = super(QuestionAdminForm, self).clean()
        
        type = cleaned_data.get('type')
        
        if type == QuestionTypes[0][0]:
            self.validate_required_fields(cleaned_data, ['choice_A', 'choice_B', 'choice_C', 'choice_D'])
            
            true_choices = [is_true for is_true in [cleaned_data.get('is_true_A'), cleaned_data.get('is_true_B'), cleaned_data.get('is_true_C'), cleaned_data.get('is_true_D')] if is_true == True]
            
            if len(true_choices) != 1:
                raise ValidationError('Only one choice should be correct.')
            
        return self.cleaned_data
        
    def validate_required_fields(self, cleaned_data, field_names=[], message="This field is required."):
        for field_name in field_names:
            if(field_name in cleaned_data and (cleaned_data[field_name] == None or cleaned_data[field_name] == '')):
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
    
    def save_model(self, request, obj, form, change):
        messages.add_message(request, messages.INFO, f"scheduled exam {obj.for_grade} {obj.subject} for {obj.scheduled_for}")
        
        super().save_model(request, obj, form, change)

        exam_chain(obj.pk, obj.scheduled_for, obj.duration, obj.results_date)
        
        target_students = StudentUser.objects.filter(grade = obj.for_grade)
        target_emails = list(target_students.values_list('email', flat=True))
    
        questions = Question.objects.filter(exam = obj)
        
        end_time = (obj.scheduled_for + timedelta(hours=(float)(obj.duration)))
        
        send_mail(
                subject=f'Pharanology: You have an upcoming {obj.subject} exam on {obj.scheduled_for}',
                from_email=None,
                message=
                f'''You have an upcoming exam soon, study well!

                
                Exam details:
                    - Subject: {obj.subject}
                    - Grade: {obj.for_grade}
                    - Duration: {obj.duration}
                    - Available on: {obj.scheduled_for}
                    - Ends on: {end_time}
                    - Questions: {len(questions)}         

                    
                -The Pharanology Team''',
                recipient_list=list(target_emails),
                fail_silently=False,
            )
        
        for student in target_students:
            student.upcoming_exams.add(obj)

admin.site.register(Subject)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)