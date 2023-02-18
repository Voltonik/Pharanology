from rest_framework.response import Response
from rest_framework.exceptions import *
from rest_framework.decorators import api_view

from accounts.models import StudentUser
from accounts.enums import AccountRoles
from accounts.decorators import authorized_view

from django.utils import timezone

from datetime import datetime

from .models import *
from .serializers import QuestionSerializer

def get_exam_data(request, exam_pk, get_questions=True):
	if request.user.role != AccountRoles.STUDENT:
		raise PermissionDenied("You are not a student.")
	
	try:
		exam_instance = Exam.objects.get(pk = int(exam_pk))
	except Exam.DoesNotExist:
		raise NotFound("Exam not found")
			
	student = StudentUser.objects.get(username = request.user.username)
	
	if get_questions:
		questions = Question.objects.filter(exam = exam_instance).all()
		
		return (exam_instance, questions, student)
	
	return (exam_instance, student)

@api_view(['POST'])
@authorized_view
def save_question_answer(request, exam_pk):
	'''
	to send: chosen = {"1": "choice_A_1"}
	
	chosen example: key is question_pk, value is choice id
	
	{
		"chosen":{
			"1":"choice_A_1",
			"3":"choice_B_2",
			"5":"choice_C_3",
			"2":"is_true_4"
		}
	}
	'''
	
	(exam_instance, student) = get_exam_data(request, exam_pk, False)
	
	if student.exams_history[exam_pk]["submitted"]:
		raise MethodNotAllowed("You have already submitted that exam")

	student.exams_history[exam_pk] = student.exams_history[exam_pk] | {
		"chosen": student.exams_history.get(exam_pk, {}).get("chosen", {}) | request.data,
	}

	student.save(update_fields=['exams_history'])
	
	return Response(student.exams_history)

@api_view(['GET', 'POST'])
@authorized_view
def begin_exam(request, exam_pk):
	(exam_instance, questions, student) = get_exam_data(request, exam_pk)	

	if exam_instance not in student.available_exams.all():
		raise PermissionDenied("Exam is not available for you.")
	
	if exam_pk not in student.exams_history:
		raise MethodNotAllowed("Exam not pushed yet.")

	if student.exams_history[exam_pk]["submitted"]:
		raise MethodNotAllowed("You have already submitted that exam.")
		
	
	if request.method == 'POST':
		student.submit_exam(exam_instance, questions)
		
		return Response({
			"data": student.exams_history[str(exam_pk)],
			"results_date": "Exam Results date not public" if not exam_instance.broadcast_results_date else f"Exam results will be ready on {exam_instance.results_date}"
		})
	
	return Response(QuestionSerializer(questions, many=True).data)

@api_view(['GET'])
@authorized_view
def results(request, exam_pk):
	(exam_instance, questions, student) = get_exam_data(request, exam_pk)
	
	if not exam_instance.full_history_available:
		raise MethodNotAllowed("Exam results details are not viewable.")
	
	if exam_instance.results_date > timezone.now():
		raise MethodNotAllowed("Exam results are not ready" if not exam_instance.broadcast_results_date else f"Exam results will be ready on {exam_instance.results_date}")
	
	student_exam_data = student.exams_history.get(exam_pk)
		
	return Response({"questions": QuestionSerializer(questions, many=True).data, "student_exam_data":student_exam_data})