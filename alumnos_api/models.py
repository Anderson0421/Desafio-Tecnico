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
    edad = models.PositiveIntegerField(validators=[MinValueValidator(
        18), MaxValueValidator(100)], blank=False, null=False)
    direccion = models.CharField(max_length=200, blank=False, null=False)
    correo = models.EmailField(
        validators=[EmailValidator()], blank=False, null=False)
    telefono = models.CharField(max_length=15, blank=False, null=False)
    DNI = models.CharField(max_length=8, unique=False, blank=False, null=False)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateField(
        auto_now_add=False, blank=False, null=False)

    def __str__(self):
        return self.nombre + " " + self.apellido


class CreacionCarrera(models.Model):
    Carrera = models.CharField(max_length=100)
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Creacion de {self.Carrera}"


class ActualizacionCarrera(models.Model):
    Nombre = models.CharField(max_length=100)
    Modificacion = models.TextField(default="")
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Actualizacion de {self.Carrera}"


class EliminacionCarrera(models.Model):
    Nombre = models.CharField(max_length=100)
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Eliminacion de {self.Carrera}"


class CreacionAlumno(models.Model):
    alumno_nombre = models.CharField(max_length=200)
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Creacion de {self.alumno_nombre}"


class ActualizacionAlumno(models.Model):
    alumno_id = models.IntegerField()
    Modificacion = models.TextField(default="")
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Actualizacion de {self.alumno_id}"


class EliminacionAlumno(models.Model):
    alumno_id = models.IntegerField()
    Created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Eliminacion de {self.alumno_id}"
