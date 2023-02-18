from django.db import models

QuestionTypes = [(0, "Multiple Choice"), (1, "True or False")]

class ExamState(models.TextChoices):
    Scheduled = 'Scheduled'
    Pushed = 'Pushed'
    AwaitingResults = 'Awaiting Results'
    Done = 'Done'