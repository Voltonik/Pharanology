from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .forms import StudentCreationForm
from .models import AccountRoles, StudentUser
from .decorators import *

@unauthenticated_user
def register_request(request):
    form = StudentCreationForm()
    
    if request.method == 'POST':
        form = StudentCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
            return redirect('student_dashboard')
    
    context = {'form': form}
    return render(request, 'register.html', context)

@unauthenticated_user
def login_request(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            
            return redirect('/' if user.role == AccountRoles.STUDENT else 'examiner_dashboard')
        else:
            messages.info(request, 'Username or password is incorrect')
    
    return render(request, 'login.html')

def logout_request(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
@allowed_roles([AccountRoles.STUDENT])
def student_dashboard_request(request):
    if request.user.role != AccountRoles.STUDENT:
        return redirect('examiner_dashboard')
    student = StudentUser.objects.get(email = request.user.email)
    
    exams_history = {k: v for k, v in student.exams_history.items() if v["show"] == True}
    print(exams_history)
    return render(request, 'student_dashboard.html', context= {"upcoming_exams": student.upcoming_exams, "available_exams": student.available_exams, "exams_history": exams_history})

@login_required(login_url='login')
@allowed_roles([AccountRoles.EXAMINER])
def examiner_dashboard_request(request):
    return render(request, 'examiner_dashboard.html')