from django.http import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Carrera, Alumno
from .serializers import CarreraSerializer, AlumnoSerializer
from rest_framework import status


class CarreraListView(APIView):
    def get(self, request, format=None):
        if Carrera.objects.all():
            carreras = Carrera.objects.all()
            serializer = CarreraSerializer(carreras, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = CarreraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlumnosListView(APIView):
    def get(self, request, format=None):
        if Alumno.objects.all():
            alumnos = Alumno.objects.all()
            serializer = AlumnoSerializer(alumnos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = AlumnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarreraDetailView(APIView):
    def get_object(self, pk):
        try:
            return Carrera.objects.get(pk=pk)
        except Carrera.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        carrera = self.get_object(pk)
        serializer = CarreraSerializer(carrera)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        try:
            carrera = Carrera.objects.get(pk=pk)
        except Carrera.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        carrera.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        carrera = self.get_object(pk)
        serializer = CarreraSerializer(carrera, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlumnoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Alumno.objects.get(pk=pk)
        except Alumno.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        alumno = self.get_object(pk)
        serializer = AlumnoSerializer(alumno)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        alumno = self.get_object(pk)
        serializer = AlumnoSerializer(alumno, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            alumno = Alumno.objects.get(pk=pk)
        except Alumno.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        alumno.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
