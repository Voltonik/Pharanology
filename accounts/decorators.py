from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages

def unauthenticated_user(view_func):
	"""
	Only called when user is not logged in.
	"""
	def wrapper_func(request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('dashboard')

		return view_func(request, *args, **kwargs)
		
	return wrapper_func

def allowed_users(allowed_roles=[]):
	def decorator(view_func):
		def wrapper_func(request, *args, **kwargs):
			group = []
			if request.user.groups.exists():
				group = list(request.user.groups.values_list('name', flat = True))
			
			if not set(allowed_roles).isdisjoint(group):
				return view_func(request, *args, **kwargs)
			
			messages.error(request, 'You are not authorized to view this page.')
			return render(request, 'error.html')
		return wrapper_func
	return decorator