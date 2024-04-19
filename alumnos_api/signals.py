from django.db.models.signals import pre_save, post_save, pre_delete
from django.dispatch import receiver
from .models import Carrera, CreacionCarrera, ActualizacionCarrera, EliminacionCarrera, Alumno, CreacionAlumno, ActualizacionAlumno, EliminacionAlumno


@receiver(post_save, sender=Carrera)
def trigger_creacion(sender, instance, created, **kwargs):
    if created:
        CreacionCarrera.objects.create(
            Carrera=instance.nombre
        )


@receiver(pre_save, sender=Carrera)
def trigger_pre_actualizacion(sender, instance, **kwargs):
    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return
    updated_fields = []
    for field in instance._meta.fields:
        if getattr(old_instance, field.attname) != getattr(instance, field.attname):
            updated_fields.append(field.attname)
    setattr(instance, '_updated_fields', updated_fields)


@receiver(post_save, sender=Carrera)
def trigger_post_actualizacion(sender, instance, created, **kwargs):
    if not created:
        updated_fields = getattr(instance, '_updated_fields', [])
        if updated_fields:
            ActualizacionCarrera.objects.create(
                Nombre=instance.nombre,
                Modificacion=", ".join(updated_fields)
            )
        delattr(instance, '_updated_fields')


@receiver(pre_delete, sender=Carrera)
def trigger_eliminacion(sender, instance, **kwargs):
    EliminacionCarrera.objects.create(
        Nombre=instance.nombre
    )


@receiver(post_save, sender=Alumno)
def trigger_creacion_alumno(sender, instance, created, **kwargs):
    if created:
        CreacionAlumno.objects.create(
            alumno_nombre=instance.nombre
        )


@receiver(pre_save, sender=Alumno)
def trigger_pre_actualizacion_alumno(sender, instance, **kwargs):
    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return
    updated_fields = []
    for field in instance._meta.fields:
        if getattr(old_instance, field.attname) != getattr(instance, field.attname):
            updated_fields.append(field.attname)
    setattr(instance, '_updated_fields', updated_fields)


@receiver(post_save, sender=Alumno)
def trigger_post_actualizacion_alumno(sender, instance, created, **kwargs):
    if not created:
        updated_fields = getattr(instance, '_updated_fields', [])
        if updated_fields:
            ActualizacionAlumno.objects.create(
                alumno_id=instance.id,
                Modificacion=", ".join(updated_fields)
            )
        delattr(instance, '_updated_fields')


@receiver(pre_delete, sender=Alumno)
def trigger_eliminacion_alumno(sender, instance, **kwargs):
    EliminacionAlumno.objects.create(
        alumno_id=instance.id
    )