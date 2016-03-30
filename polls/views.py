from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import generics
from polls.models import Question
from polls.serializers import QuestionSerializer

from .models import Question


class QuestionList(generics.ListCreateAPIView):
	"""
    List all code questions, or create a new question.
    """
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer
		

class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
	"""docstring for Q"""
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer