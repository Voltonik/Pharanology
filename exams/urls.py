from django.urls import path

from . import views

urlpatterns = [
	path('begin/<exam_pk>/', views.begin_exam, name="begin_exam"),
    path('results/<exam_pk>/', views.results, name="results"),
    path('choose/<exam_pk>/', views.save_question_answer, name="save_question_answer"),
]