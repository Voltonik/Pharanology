from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from .models import *
from .enums import AccountRoles
from exams.serializers import ExamSerializer
from exams.enums import ExamState

def get_user_serializer(user):
    if user.role == AccountRoles.STUDENT:
        return StudentSerializer(StudentUser.objects.get(username = user.username))
    elif user.role == AccountRoles.EXAMINER:
        return ExaminerSerializer(ExaminerUser.objects.get(username = user.username))
    elif user.role == AccountRoles.ADMIN:
        return AdminSerializer(BaseUser.objects.get(username = user.username))
  
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = "__all__"      

class StudentSerializer(serializers.ModelSerializer):
    available_exams = ExamSerializer(many = True)
    upcoming_exams = ExamSerializer(many = True)
    
    exams_history = serializers.JSONField()
    
    class Meta:
        model = StudentUser
        fields = ("id",
                  "available_exams",
                  "upcoming_exams",
                  "exams_history",
                  "last_login",
                  "role",
                  "username",
                  "first_name",
                  "last_name",
                  "email",
                  "grade")
        
    @property
    def data(self):
        _data = super().data
        _data['exams_history'] = {k: v for k, v in _data['exams_history'].items() if v["show"] == True or v["show_detailed"] == True}
        
        for exam_key in _data["exams_history"]:
            exam = _data["exams_history"][exam_key]
            if not exam["show_detailed"]:
                _data["exams_history"][exam_key].pop("corrections")
                _data["exams_history"][exam_key].pop("chosen")
        
        return _data

class ExaminerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExaminerUser
        fields = "__all__" 

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                raise serializers.ValidationError('Wrong username or password.')
        else:
            raise serializers.ValidationError('Both "username" and "password" are required.')

        data['user'] = user
        return data
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=BaseUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=BaseUser.objects.all())])
    password1 = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    
    grade = serializers.ChoiceField(choices=SchoolGrades.choices, required=True)
    
    def validate(self, data):
        username = data.get('username', '')
        password1 = data.get('password1', '')
        password2 = data.get('password2', '')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        
        if len(username) < 3 or len(username) > 15:
            raise serializers.ValidationError('Username must be between 3 and 15 characters long.')
        
        if len(first_name) < 2 or len(first_name) > 24:
            raise serializers.ValidationError('First name must be between 2 and 24 characters long.')
        
        if len(last_name) < 2 or len(last_name) > 24:
            raise serializers.ValidationError('Last name must be between 2 and 24 characters long.')
        
        errors = validate_password(password1)
        if errors != None:
            raise serializers.ValidationError(errors)
        
        if password1 != password2:
            raise serializers.ValidationError("The two password fields didn't match.")
        
        user = StudentUser.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=data['email'],
            grade=data['grade'],
            password=password2
        )
        
        available = Exam.objects.filter(for_grade = user.grade, state = ExamState.Pushed).all()
        
        user.upcoming_exams.add(*(Exam.objects.filter(for_grade = user.grade, state = ExamState.Scheduled).all()))
        user.available_exams.add(*available)
        
        for available_exam in available:
            user.exams_history[available_exam.pk] = user.exams_history.get(str(available_exam.pk), {}) | {
                "exam_name": available_exam.__str__(),
                "submitted": False,
                "show": False,
                "show_detailed": False
            }
            
        user.save(update_fields=['exams_history'])
        
        return data