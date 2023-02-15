from rest_framework import serializers
from rest_framework.validators import UniqueValidator, ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate, login, logout

from .models import *

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
                raise serializers.ValidationError('Access denied: wrong username or password.', code='authorization')
        else:
            raise serializers.ValidationError('Both "username" and "password" are required.', code='authorization')

        data['user'] = user
        return data
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=StudentUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=StudentUser.objects.all())])
    password1 = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    
    grade = serializers.ChoiceField(choices=SchoolGrades.choices, default=SchoolGrades.G01)
    
    def validate(self, data):
        username = data.get('username')
        password1 = data.get('password1')
        password2 = data.get('password2')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        
        if len(username) < 3 or len(username) > 15:
            raise ValidationError('Username must be between 3 and 15 characters long')
        
        if len(first_name) < 2 or len(first_name) > 24:
            raise ValidationError('First name must be between 2 and 24 characters long')
        
        if len(last_name) < 2 or len(last_name) > 24:
            raise ValidationError('Last name must be between 2 and 24 characters long')
        
        errors = validate_password(password1)
        if errors != None:
            raise ValidationError(errors)
        
        if password1 != password2:
            raise serializers.ValidationError("The two password fields didn't match")
        
        return data