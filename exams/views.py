from rest_framework.response import Response
from rest_framework.exceptions import *
from rest_framework.decorators import api_view

from accounts.models import StudentUser
from accounts.enums import AccountRoles
from accounts.decorators import authorized_view

from datetime import datetime

from .models import *
from .serializers import QuestionSerializer

def get_exam_data(request, exam_pk):
	if request.user.role != AccountRoles.STUDENT:
		raise PermissionDenied("You are not a student.")
	
	try:
		exam_instance = Exam.objects.get(pk = exam_pk)
	except Exam.DoesNotExist:
		raise NotFound("Exam not found")
			
	student = StudentUser.objects.get(username = request.user.username)
	
	questions = Question.objects.filter(exam = exam_instance).all()
	
	return (exam_instance, questions, student)

@api_view(['GET', 'POST'])
@authorized_view
def begin_exam(request, exam_pk):
	(exam_instance, questions, student) = get_exam_data(request, exam_pk)	
	
	if exam_pk in student.exams_history:
		raise MethodNotAllowed("You have already done that exam")
		
	if exam_instance not in student.available_exams.all():
		raise PermissionDenied("Exam is not available for you.")
	
	if request.method == 'POST':
		student.submit_exam(request.POST, exam_instance, questions)
		
		return Response(None)
	
	return Response(QuestionSerializer(questions, many=True).data)

@api_view(['GET'])
@authorized_view
def results(request, exam_pk):
	(exam_instance, questions, student) = get_exam_data(request, exam_pk)
	
	if exam_instance.results_date < datetime.now():
		return MethodNotAllowed("Exam results are not ready" if not exam_instance.broadcast_results_date else f"Exam results will be ready on {exam_instance.results_date}")
	
	student_exam_data = student.exams_history.get(exam_pk, None)
	
	if student_exam_data == None:
		return MethodNotAllowed("You haven't done that exam yet")
			
	return Response(QuestionSerializer(questions, many=True).data | {"student_exam_data":student_exam_data})