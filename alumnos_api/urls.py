from .views import *
from django.urls import path

urlpatterns = [
    path('alumnos/', AlumnosListView.as_view(), name='list_alumnos'),
    path('alumnos/<int:pk>/', AlumnoDetailView.as_view(), name='detail_alumnos'),
    path('carreras/', CarreraListView.as_view(), name='list_carreras'),
    path('carreras/<int:pk>/', CarreraDetailView.as_view(), name='carreras_detail'),
    
    #Registro - triggers de carreras
    path('carreras/creaciones/', CarrerasCreacionView.as_view(), name='list_creacion_carrera'),
    path('carreras/actualizaciones', CarrerasActualizacionView.as_view(), name='actualizacion_carrera'),
    path('carreras/eliminaciones/', CarrerasEliminacionView.as_view(), name='detail_creacion_carrera'),
    
    #Registro - triggers de alumnos
    
    path('alumnos/creaciones/', AlumnosCreacionView.as_view(), name='list_creacion_alumno'),
    path('alumnos/actualizaciones', AlumnosActualizacionView.as_view(), name='actualizacion_alumno'),
    path('alumnos/eliminaciones/', AlumnosEliminacionView.as_view(), name='detail_creacion_alumno'),
    path('alumnos/actualizaciones/<int:pk>/', AlumnoActualizacionesDetailView.as_view(), name='alumno_detalle_logs'),
    
]
