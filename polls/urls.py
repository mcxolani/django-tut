from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
	url(r'^$', views.QuestionList.as_view(), name='index'),
	url(r'^(?P<pk>[0-9]+)/$', views.QuestionDetail.as_view(), name='detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)