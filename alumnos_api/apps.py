from django.apps import AppConfig


class AlumnosApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'alumnos_api'
    
    def ready(self):
        import alumnos_api.signals
