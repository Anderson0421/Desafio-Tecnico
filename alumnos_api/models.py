from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, EmailValidator


class Carrera(models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre


class Alumno(models.Model):
    nombre = models.CharField(max_length=100, blank=False, null=False)
    apellido = models.CharField(max_length=100, blank=False, null=False)
    edad = models.PositiveIntegerField(validators=[MinValueValidator(18), MaxValueValidator(100)], blank=False, null=False)
    direccion = models.CharField(max_length=200, blank=False, null=False)
    correo = models.EmailField(validators=[EmailValidator()], blank=False, null=False)
    telefono = models.CharField(max_length=15, blank=False, null=False)
    DNI = models.CharField(max_length=8, unique=False, blank=False, null=False)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateField(auto_now_add=False, blank=False, null=False)

    def __str__(self):
        return self.nombre + " " + self.apellido
