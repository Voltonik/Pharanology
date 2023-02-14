from django.shortcuts import redirect
from django.http import HttpResponse

from .models import AccountRoles

def unauthenticated_user(view_func):
	"""
	Only called when user is not logged in.
	"""
	def wrapper_func(request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('/' if request.user.role == AccountRoles.STUDENT else 'examiner_dashboard')

		return view_func(request, *args, **kwargs)
		
	return wrapper_func

def allowed_roles(allowed_roles:list):
	def decorator(view_func):
		def wrapper_func(request, *args, **kwargs):
			if (request.user.role == AccountRoles.ADMIN) or (request.user.role in allowed_roles):
				return view_func(request, *args, **kwargs)
			
			return HttpResponse('You are not authorized to view this page.')
		
		return wrapper_func
	return decorator