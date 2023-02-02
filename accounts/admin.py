from django.contrib import admin
from django.core.mail import send_mail

from .models import BaseUser, ExaminerUser, StudentUser

class StudentAdmin(admin.ModelAdmin):
	model = StudentUser

	actions = ['make_examiner']

	def make_examiner(self, request, queryset):
		for student_user in queryset:
			password = student_user.password
			username = student_user.username
			email = student_user.email
			first_name = student_user.first_name
			last_name = student_user.last_name
			
			student_user.delete()
			
			ExaminerUser.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
			
			send_mail(
				subject='Pharanology Team: You are now an Examiner on Pharanology!',
				from_email=None,
				message=
				'''You are now an Examiner and have access to the tools to make exams for students.
				Please request a password change to access your account by clicking on "Reset Password" on the login page.
				
				-The Pharanology Team''',
				recipient_list=[email],
				fail_silently=False,
			)

admin.site.register(BaseUser)
admin.site.register(ExaminerUser)
admin.site.register(StudentUser, StudentAdmin)