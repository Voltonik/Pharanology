from django.contrib import admin
from django.forms import ModelForm

from utils.widgets import *

from .models import *

class QuestionAdminForm(ModelForm):
    class Meta:
        model = Question
        fields = "__all__"
        widgets = {
            "question": BetterJsonInlineWidget(
                follow_field="type",
                schema_mapping=schema_mapping,
            ),
        }

class QuestionInline(admin.StackedInline):
    model = Question
    form = QuestionAdminForm
    extra = 0

class ExamAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline
    ]
    
admin.site.register(Subject)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Question)