from django.urls import path

from . import views

urlpatterns = [
	path('begin/<pk>/', views.begin_exam, name="begin_exam"),
    path('results/<pk>/', views.results, name="results")
]