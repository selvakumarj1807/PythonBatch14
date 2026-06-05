from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response

from students.models import Staff, Student
from students.serializers import StaffSerializer, StudentSerializer

# Create your views here.

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    def create(self, request):
        serializer = StudentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'message': 'Student created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        studentName = request.query_params.get('student_name', None)
        
        if studentName:
            studentData = Student.objects.filter(name__icontains=studentName)
        else:
            studentData = Student.objects.all()
        
        serializer = StudentSerializer(studentData, many=True)
        
        return Response(
            {
                'students_count': studentData.count(),
                'message': 'Students retrieved successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def create(self, request):
        serializer = StaffSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'message': 'Staff created successfully',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)