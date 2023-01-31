from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .forms import CreateUserForm

def register_request(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    
    form = CreateUserForm()
    
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account was created')
            
            return redirect('login')
    
    context = {'form': form}
    return render(request, 'register.html', context)

def login_request(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    
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
def dashboard_request(request):
    return render(request, 'dashboard.html')