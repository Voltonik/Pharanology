from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import send_mail
from django.utils import timezone

from .models import *

class StudentCreationForm(UserCreationForm):
    grade = forms.ChoiceField(choices = SchoolGrades.choices)
    
    class Meta:
        model = StudentUser
        fields = ["first_name", "last_name", "username", "email", "grade"]
        
    def __init__(self, *args, **kwargs):
        super(StudentCreationForm, self).__init__(*args, **kwargs)

        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['email'].required = True