from .views import *
from django.urls import path

urlpatterns = [
    path('alumnos/', AlumnosListView.as_view(), name='list_alumnos'),
    path('alumnos/<int:pk>/', AlumnoDetailView.as_view(), name='detail_alumnos'),
    path('carreras/', CarreraListView.as_view(), name='list_carreras'),
    path('carreras/<int:pk>/', CarreraDetailView.as_view(), name='carreras_detail'),
    
]
