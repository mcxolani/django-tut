from rest_framework.generics import RetrieveUpdateAPIView, RetrieveDestroyAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, ListCreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer


class QuestionListCreate(ListAPIView):
    """
    List all code questions, or create a new question.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]


class QuestionRetrieveUpdateDestroy(RetrieveDestroyAPIView):
    """docstring for Q"""
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]


class QuestionVote(RetrieveUpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        question = self.get_object()
        selected_choice = question.choice_set.get(pk=request.data.get("choice"))
        selected_choice.votes += 1
        selected_choice.save()
        return Response({"success": True})


class QuestionViewResults(RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]