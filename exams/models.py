from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.
# class Student(models.Model):
# 	class SchoolGrades(models.TextChoices):
# 		G01 = 'G01'
# 		G02 = 'G02'
# 		G03 = 'G03'
# 		G04 = 'G04'
# 		G05 = 'G05'
# 		G06 = 'G06'
# 		G07 = 'G07'
# 		G08 = 'G08'
# 		G09 = 'G09'
# 		G10 = 'G10'
# 		G11 = 'G11'
# 		G12 = 'G12'
	
# 	name = models.CharField(max_length=200)
# 	email = models.CharField(max_length=200)
# 	grade = models.CharField(max_length=3, choices=SchoolGrades.choices, default=SchoolGrades.G11)
	
# 	def __str__(self):
# 		return self.name