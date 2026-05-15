from django.db import models

# Create your models here.

class Employees(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    departmentid = models.CharField(max_length=50)

class Departments(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'departments'
        
    def __str__(self):
        return self.name + " - " + self.location
        