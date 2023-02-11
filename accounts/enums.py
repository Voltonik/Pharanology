from django.db import models

class AccountRoles(models.TextChoices):
    STUDENT = "STUDENT"
    EXAMINER = "EXAMINER"
    ADMIN = "ADMIN"

class SchoolGrades(models.TextChoices):
    G01 = 'G01'
    G02 = 'G02'
    G03 = 'G03'
    G04 = 'G04'
    G05 = 'G05'
    G06 = 'G06'
    G07 = 'G07'
    G08 = 'G08'
    G09 = 'G09'
    G10 = 'G10'
    G11 = 'G11'
    G12 = 'G12'