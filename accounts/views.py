from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group

from .forms import CreateUserForm
from .decorators import unauthenticated_user, allowed_roles

@unauthenticated_user
def register_request(request):
    form = CreateUserForm()
    
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            
            group = Group.objects.get(name='student')
            user.groups.add(group)
            
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
            return redirect('dashboard')
    
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
            return redirect('dashboard')
        else:
            messages.info(request, 'Username or password is incorrect')
    
    return render(request, 'login.html')

def logout_request(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
@allowed_roles(allowed_roles=['student'])
def student_dashboard_request(request):
    return render(request, 'student_dashboard.html')