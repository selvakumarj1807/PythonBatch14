from django.shortcuts import render

# Create your views here.

def index(request):
    users = [101, 'Ram', 'Male', 25, 'Chennai']
    view_users = [
        {"name": 'Ram', "age": 25},
        {"name": 'Shyam', "age": 15},
        {"name": 'Sita', "age": 28},
        {"name": 'Gita', "age": 12},
    ]
    return render(request, 'index.html', {'user_data': users, 'view_data': view_users})