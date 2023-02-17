from rest_framework.exceptions import NotAuthenticated

def authorized_view(view_func):
	def wrapper_func(request, *args, **kwargs):
		if not request.user.is_authenticated:
			raise NotAuthenticated("You are not logged in")
		return view_func(request, *args, **kwargs)
	return wrapper_func