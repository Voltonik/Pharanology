from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import StudentUser
from .serializers import *
from .decorators import *

@api_view(['GET', 'POST'])
def index(request):
    return render(request, 'base.html')


@api_view(['GET', 'POST'])
def register_request(request):
    if request.method != "POST":
        return render(request, 'base.html')
    
    serializer = StudentUserSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.create()
    
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password1'])
        login(request, user)
    
        return Response(None)
    
    return Response(serializer._errors)


@api_view(['GET', 'POST'])
def login_request(request):
    if request.method != "POST":
        return render(request, 'base.html')
    
    serializer = LoginSerializer(data = request.data, context={ 'request': request })
    
    if serializer.is_valid(raise_exception=True):
        user = serializer.validated_data['user']
        login(request, user)
        
        return Response(None)
    return Response(serializer._errors)


@api_view(['POST'])
def logout_request(request):
    logout(request)
    return Response(None)


# @api_view(['GET'])
# def student_dashboard_request(request):
#     student = StudentUser.objects.get(email = request.user.email)
    
#     exams_history = {k: v for k, v in student.exams_history.items() if v["show"] == True}
#     print(exams_history)
#     return render(request, 'student_dashboard.html', context= {"upcoming_exams": student.upcoming_exams, "available_exams": student.available_exams, "exams_history": exams_history})


# def examiner_dashboard_request(request):
#     return render(request, 'examiner_dashboard.html')