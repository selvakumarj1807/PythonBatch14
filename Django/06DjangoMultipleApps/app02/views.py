from django.shortcuts import render

# Create your views here.

def app02index(request):
    return render(request, 'app02/index.html')