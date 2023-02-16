from django.contrib.auth import authenticate, login, logout

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from .models import StudentUser


@api_view(['GET', 'POST'])
def register_request(request):
    if request.method != "POST":
        return Response({"is_authenticated": request.user.is_authenticated})
    
    serializer = RegisterSerializer(data = request.data)
    
    if serializer.is_valid(raise_exception=True):
        StudentUser.objects.create_user(
            username=serializer.validated_data['username'],
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name'],
            email=serializer.validated_data['email'],
            grade=serializer.validated_data['grade'],
            password=serializer.validated_data['password2']
        )
    
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password1'])
        login(request, user)
    
        return Response(serializer.data)
    
    return Response(serializer._errors)


@api_view(['GET', 'POST'])
def login_request(request):
    if request.method != "POST":
        serializer = StudentSerializer(StudentUser.objects.get(username = request.user.username))
        
        return Response({"is_authenticated": request.user.is_authenticated} | serializer.get_data())
    
    serializer = LoginSerializer(data = request.data, context={ 'request': request })
    
    if serializer.is_valid(raise_exception=True):
        user = serializer.validated_data['user']
        login(request, user)
        
        return Response({"username": user.username})
    return Response(serializer._errors)


@api_view(['POST'])
def logout_request(request):
    logout(request)
    return Response(None)


@api_view(['GET'])
def student_dashboard_request(request):
    serializer = StudentSerializer(StudentUser.objects.get(username = request.user.username))
    
    return Response(serializer.get_data())


@api_view(['GET'])
def examiner_dashboard_request(request):
    return Response(None)