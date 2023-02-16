from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.models import StudentUser
from accounts.enums import AccountRoles

from .models import *
from datetime import datetime

def get_exam_data(request, exam_pk):
	if request.user.role != AccountRoles.STUDENT:
		return (None, None, None, "You are not a student.")
	
	exams = Exam.objects.get(pk = exam_pk)
	
	if len(exams) == 0:
		return (None, None, None, "Exam not found.")
	
	exam_instance = exams[0]
	
	student = StudentUser.objects.get(email = request.user.email)
	
	questions = Question.objects.filter(exam = exam_instance).all()
	
	return (exam_instance, questions, student, None)

def begin_exam(request, exam_pk):
	(exam_instance, questions, student, error) = get_exam_data(request, exam_pk)	
	
	if exam_pk in student.exams_history:
		error = "You have already done that exam"
		
	if exam_instance not in student.available_exams.all():
		error = "Exam is not available for you."
	
	if error != None:
		return Response(error)
	
	if request.method == 'POST':
		(marks, max_marks, corrections, chosen) = exam_instance.grade(request.POST, questions)
		
		student.exams_history[exam_pk] = {
			"exam_name": exam_instance.__str__(),
			"marks": marks,
			"corrections": corrections,
			"chosen": chosen,
			"max_marks": max_marks,
			"show": False
		}
		
		student.save(update_fields=['exams_history'])
		
		student.available_exams.remove(exam_instance)
		
		return Response(None)
	
	return Response(None)

def results(request, exam_pk):
	(exam_instance, questions, student, error) = get_exam_data(request, exam_pk)
	
	if error != None:
		return Response(error)
	
	if exam_instance.results_date < datetime.now():
		return Response("Exam results are not ready" if not exam_instance.broadcast_results_date else f"Exam results will be ready on {exam_instance.results_date}")
	
	student_exam_data = student.exams_history.get(exam_pk, None)
	
	if student_exam_data == None:
		return Response("You haven't done that exam yet")
			
	return Response({"questions":questions, "student_exam_data":student_exam_data})