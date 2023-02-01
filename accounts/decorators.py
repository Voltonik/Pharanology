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

def allowed_roles(allowed_roles, admin_dashboard_fallback = True):
	def decorator(view_func):
		def wrapper_func(request, *args, **kwargs):
			groups = []
			if request.user.groups.exists():
				groups = list(request.user.groups.values_list('name', flat = True))
			
			if not set(allowed_roles).isdisjoint(groups):
				return view_func(request, *args, **kwargs)
			elif admin_dashboard_fallback and 'admin' in groups:
				return render(request, 'admin_dashboard.html')
			
			messages.error(request, 'You are not authorized to view this page.')
			return render(request, 'error.html')
		
		return wrapper_func
	return decorator