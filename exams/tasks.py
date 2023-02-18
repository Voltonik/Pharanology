from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.mail import send_mail

from datetime import timedelta, datetime

from .models import Exam, Question, ExamState
from accounts.models import StudentUser

logger = get_task_logger(__name__)

@shared_task
def broadcast_exam_results(exam_instance_pk):
    exam_instance = Exam.objects.get(pk = exam_instance_pk)
        
    exam_instance.state = ExamState.Done
    exam_instance.save(update_fields=['state'])
    
    target_students = StudentUser.objects.filter(exams_history__has_key = exam_instance_pk)
    
    for student in target_students:
        if exam_instance.full_history_available:
            student.exams_history[exam_instance_pk]["show_detailed"] = True
        else:
            student.exams_history[exam_instance_pk]["show"] = True
            

        student.save(update_fields=['exams_history'])
    
@shared_task
def end_exam(exam_instance_pk):
    exam_instance = Exam.objects.get(pk = exam_instance_pk)
    
    exam_instance.state = ExamState.AwaitingResults
    exam_instance.save(update_fields=['state'])
    
    # close exam on students still in it
    late_students = StudentUser.objects.filter(grade = exam_instance.for_grade).exclude(exams_history__contains={str(exam_instance_pk): {"submitted": False}})
    
    for late_student in late_students:
        print(f"LATE STUDENT ------------> {late_student}")
        late_student.submit_exam(late_student.exams_history[exam_instance.pk]["chosen"], exam_instance, Question.objects.filter(exam = exam_instance).all())

@shared_task
def push_exam(exam_instance_pk, end_time):
    exam_instance = Exam.objects.get(pk = exam_instance_pk)
    
    exam_instance.state = ExamState.Pushed
    exam_instance.save(update_fields=['state'])
    
    target_students = StudentUser.objects.filter(grade = exam_instance.for_grade)
    target_emails = list(target_students.values_list('email', flat=True))
    
    questions = Question.objects.filter(exam = exam_instance)
    
    send_mail(
            subject=f'Pharanology: You have a {exam_instance.subject} exam! Your have 10 minutes to start it or your time will start!',
            from_email=None,
            message=
            f'''You have an exam!
            If you don't start it within 10 minutes your time will start ticking.

            Exam details:
                - Subject: {exam_instance.subject}
                - Grade: {exam_instance.for_grade}
                - Duration: {exam_instance.duration}
                - Ends on: {end_time.time()}
                - Questions: {len(questions)}         

                
            -The Pharanology Team''',
            recipient_list=list(target_emails),
            fail_silently=False,
        )
    
    for student in target_students:
        student.available_exams.add(exam_instance)
        student.upcoming_exams.remove(exam_instance)
        student.exams_history[exam_instance.pk] = {
            "exam_name": exam_instance.__str__(),
            "submitted": False,
            "show": False,
            "show_detailed": False
        }
        
        student.save(update_fields=['exams_history'])
    
    
def exam_chain(exam_instance_pk, eta, duration, results_date):
    end_time = datetime.now() + timedelta(hours=(float)(duration))
    
    push_exam.apply_async((exam_instance_pk, end_time), eta=eta)
    end_exam.apply_async((exam_instance_pk,), eta = end_time)
    broadcast_exam_results.apply_async((exam_instance_pk,), eta = results_date)