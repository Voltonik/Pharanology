from django.contrib.auth import authenticate, login, logout

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from .models import StudentUser
from .decorators import authorized_view

@api_view(['GET'])
def user_data_request(request):
    if request.user.is_authenticated:
        return Response({"is_authenticated": request.user.is_authenticated} | get_user_serializer(request.user).data)
    return Response({"is_authenticated": request.user.is_authenticated})

@api_view(['POST'])
def register_request(request):    
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
    
        return Response(get_user_serializer(request.user).data)
    
    return Response(serializer.errors)


@api_view(['POST'])
def login_request(request):
    serializer = LoginSerializer(data = request.data, context={ 'request': request })
    
    if serializer.is_valid(raise_exception=True):
        user = serializer.validated_data['user']
        login(request, user)
        
        return Response(get_user_serializer(request.user).data)
    return Response(serializer.errors)


@api_view(['POST'])
@authorized_view
def logout_request(request):
    logout(request)
    return Response(None)


@api_view(['GET'])
@authorized_view
def student_dashboard_request(request):
    serializer = get_user_serializer(request.user)
    
    return Response(serializer.data)


@api_view(['GET'])
@authorized_view
def examiner_dashboard_request(request):
    return Response(None)