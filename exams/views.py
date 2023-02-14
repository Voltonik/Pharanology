from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from accounts.models import StudentUser
from accounts.enums import AccountRoles
from accounts.templatetags.exam_tags import hash_exam

from .models import *
from datetime import datetime

def get_exam_data(request, exam_hashed_name):
	if request.user.role != AccountRoles.STUDENT:
		return (None, None, None, "You are not a student.")
	
	# TODO Maybe just use pk if no risk of people knowing pks cuz faster? im using hashed names instead so people don't know pk just in case. idk lol.
	exams = [e for e in Exam.objects.all() if hash_exam(e) == exam_hashed_name]
	
	if len(exams) == 0:
		return (None, None, None, "Exam not found.")
	
	exam_instance = exams[0]
	
	student = StudentUser.objects.get(email = request.user.email)
	
	questions = Question.objects.filter(exam = exam_instance).all()
	
	return (exam_instance, questions, student, None)

@login_required
def begin_exam(request, exam_hashed_name):
	(exam_instance, questions, student, error) = get_exam_data(request, exam_hashed_name)	
	
	if exam_hashed_name in student.exams_history:
		error = "You have already done that exam"
		
	if exam_instance not in student.available_exams.all():
		error = "Exam is not available for you."
	
	if error != None:
		return HttpResponse(error)
	
	if request.method == 'POST':
		(marks, max_marks, corrections, chosen) = exam_instance.grade(request.POST, questions)
		
		student.exams_history[exam_hashed_name] = {
			"exam_name": exam_instance.__str__(),
			"marks": marks,
			"corrections": corrections,
			"chosen": chosen,
			"max_marks": max_marks,
			"show": False
		}
		
		student.save(update_fields=['exams_history'])
		
		student.available_exams.remove(exam_instance)
		
		return redirect('/')
	
	return render(request, 'exam.html', {"questions": questions})

@login_required
def results(request, exam_hashed_name):
	(exam_instance, questions, student, error) = get_exam_data(request, exam_hashed_name)
	
	if error != None:
		return HttpResponse(error)
	
	if exam_instance.results_date < datetime.now():
		return HttpResponse("Exam results are not ready" if not exam_instance.broadcast_results_date else f"Exam results will be ready on {exam_instance.results_date}")
	
	student_exam_data = student.exams_history.get(exam_hashed_name, None)
	
	if student_exam_data == None:
		return HttpResponse("You haven't done that exam yet")
			
	return render(request, "results.html", {"questions":questions, "student_exam_data":student_exam_data})