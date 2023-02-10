from celery import shared_task

@shared_task
def push_exam(exam_instance):
    print("EXAM STARTED")