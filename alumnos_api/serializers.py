from rest_framework import serializers
from .models import Carrera, Alumno

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'duracion', 'descripcion']

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'apellido', 'edad', 'direccion', 'correo', 'telefono', 'carrera', 'fecha_inscripcion']
