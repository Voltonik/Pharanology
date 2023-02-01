from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_request, name="register"),
    path('login/', views.login_request, name="login"),
    path('', views.student_dashboard_request, name="dashboard"),
    path('logout/', views.logout_request, name="logout")
]