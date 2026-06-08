from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response

from students.models import Staff, Student
from students.serializers import StaffSerializer, StudentSerializer

from rest_framework.decorators import action

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
    
    def destroy(self, request, pk=None):
        try:
            student = Student.objects.get(pk=pk)
            student.delete()
            return Response(
                {
                    'message': 'Student deleted successfully'
                }, status=status.HTTP_204_NO_CONTENT
            )
        except Student.DoesNotExist:
            return Response(
                {
                    'message': 'Student not found'
                }, status=status.HTTP_404_NOT_FOUND
            )
            
    def update(self, request, pk=None):
        try:
            student = Student.objects.get(pk=pk)
            serializer = StudentSerializer(student, data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        'message': 'Student updated successfully',
                        'data': serializer.data
                    }, status=status.HTTP_200_OK
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response(
                {
                    'message': 'Student not found'
                }, status=status.HTTP_404_NOT_FOUND
            )
            
    @action(detail=False, methods=['get'], url_path='get_mobile')
    def get_mobile(self, request):
        studentMobile = request.query_params.get('student_mobile', None)
        
        if studentMobile:
            studentData = Student.objects.filter(mobile_number__icontains=studentMobile)
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