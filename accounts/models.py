from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from exams.models import Exam
from .enums import *

class BaseUserManager(BaseUserManager):    
    def create_superuser(self, username, first_name, last_name, email, password=None):
        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required!")
        if not password :
            raise ValueError("Password is required!")
          
        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email = self.normalize_email(email) , 
        )
        user.set_password(password)

        user.is_admin = True
        user.role = AccountRoles.ADMIN
        user.save(using=self._db)
        return user
                
class BaseUser(AbstractBaseUser, PermissionsMixin):    
    role = models.CharField(max_length = 8, choices = AccountRoles.choices, default = AccountRoles.STUDENT)
        
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True, unique=True)
    
    is_active = models.BooleanField(default = True)

    objects = BaseUserManager()
    
    is_admin = models.BooleanField(default = False)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name", "email"]
    
    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All examiners are staff
        return self.is_admin
    
    def save(self , *args , **kwargs):
        if not self.role or self.role == None : 
            self.role = AccountRoles.STUDENT
        return super().save(*args , **kwargs)
    
class StudentManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, email, grade, password=None):
        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required!")
        if not password :
            raise ValueError("Password is required!")
        
        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            grade=grade,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
      
    def get_queryset(self, *args,  **kwargs):
        queryset = super().get_queryset(*args , **kwargs)
        queryset = queryset.filter(role = AccountRoles.STUDENT)
        return queryset    
        
class StudentUser(BaseUser):
    grade = models.CharField(max_length=3, choices=SchoolGrades.choices, default=SchoolGrades.G01)
    
    available_exams = models.ManyToManyField(Exam, related_name='available_exams', blank=True)
    upcoming_exams = models.ManyToManyField(Exam, related_name='upcoming_exams', blank=True)
    
    exams_history = models.JSONField(default=dict, blank=True)
    
    class Meta : 
        proxy = False
        
    objects = StudentManager()
      
    def save(self , *args , **kwargs):
        self.role = AccountRoles.STUDENT
        return super().save(*args , **kwargs)
      
class ExaminerManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, email, password = None):
        if not email or len(email) <= 0 : 
            raise  ValueError("Email field is required!")
        if not password :
            raise ValueError("Password is required!")
        
        user = self.model(username = username, first_name=first_name, last_name=last_name, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using = self._db)
        return user
            
    def get_queryset(self , *args , **kwargs):
        queryset = super().get_queryset(*args , **kwargs)
        queryset = queryset.filter(role = AccountRoles.EXAMINER)
        return queryset
      
class ExaminerUser(BaseUser):
    class Meta :
        proxy = False
    objects = ExaminerManager()
      
    def save(self  , *args , **kwargs):
        self.role = AccountRoles.EXAMINER
        return super().save(*args , **kwargs)