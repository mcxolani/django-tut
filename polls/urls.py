from django.conf.urls import url

from polls.api import QuestionListCreate, QuestionViewResults, QuestionRetrieveUpdateDestroy, QuestionVote

urlpatterns = [
    url(r'^$', QuestionListCreate.as_view(), name='question-list'),
    url(r'^(?P<pk>[0-9]+)/$', QuestionRetrieveUpdateDestroy.as_view(), name='question-detail'),
    # ex: /polls/5/results/
    url(r'^(?P<pk>[0-9]+)/results/$', QuestionViewResults.as_view(), name='question-results'),
    # ex: /polls/5/vote/
    url(r'^(?P<pk>[0-9]+)/vote/$', QuestionVote.as_view(), name='question-vote'),
]

