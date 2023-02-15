from django.urls import path, re_path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('register/', views.register_request, name="register"),
    path('login/', views.login_request, name="login"),
    path('logout/', views.logout_request, name="logout"),
    path('student_dashboard/', views.student_dashboard_request, name="student_dashboard"),
    #path('examiner_dashboard/', views.examiner_dashboard_request, name="examiner_dashboard"),
    
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name="password_reset.html"), name='reset_password'),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name="password_reset_sent.html"), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_form.html"), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_done.html"), name='password_reset_complete'),
]