from rest_framework import serializers
from .models import *

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'duracion', 'descripcion']

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'apellido', 'edad','DNI', 'direccion', 'correo', 'telefono', 'carrera', 'fecha_inscripcion']

class CreacionAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreacionAlumno
        fields = '__all__'
        
class ActualizacionAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActualizacionAlumno
        fields = '__all__'
        
class EliminacionAlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EliminacionAlumno
        fields = '__all__'
    
class CreacionCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreacionCarrera
        fields = '__all__'
    
class ActualizacionCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActualizacionCarrera
        fields = '__all__'
        
class EliminacionCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = EliminacionCarrera
        fields = '__all__'