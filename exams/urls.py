from django.urls import path

from . import views

urlpatterns = [
	path('begin_exam/<exam_hashed_name>/', views.begin_exam, name="begin_exam"),
    path('results/<exam_hashed_name>/', views.results, name="results")
]