from rest_framework import serializers
from rest_framework.validators import UniqueValidator, ValidationError
from rest_framework import validators
from django.contrib.auth import authenticate, login, logout

from .models import *

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=StudentUser.objects.all())])
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs

class StudentUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=StudentUser.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=StudentUser.objects.all())])
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    
    grade = serializers.ChoiceField(choices=SchoolGrades.choices, default=SchoolGrades.G01)
    
    class Meta:
        model = StudentUser 
        fields = '__all__'
    
    def validate_password1(self, password):
        validators.validate_password(password=password,user=StudentUser)
    
    def validate_username(self, username):
        if len(username) < 6 or len(username) > 15:
            raise ValidationError('Username must be between 6 and 15 characters long')
        return username
    
    def validate_first_name(self, first_name):
        if len(first_name) < 6 or len(first_name) > 15:
            raise ValidationError('First name must be between 6 and 15 characters long')
        return first_name
    
    def validate_last_name(self, last_name):
        if len(last_name) < 6 or len(last_name) > 15:
            raise ValidationError('Last name must be between 6 and 15 characters long')
        return last_name
        
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data
    
    def create(self, validated_data):
        user = StudentUser.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            grade=validated_data['grade'],
            password=validated_data['password2']
        )

        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password1')
            instance.set_password(password)
        return super(StudentUserSerializer, self).update(instance, validated_data)