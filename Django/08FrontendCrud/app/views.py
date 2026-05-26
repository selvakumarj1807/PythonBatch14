from django.shortcuts import redirect, render

from app.models import Contact

# Create your views here.

def index(request):
    users = Contact.objects.all()
    return render(request, 'index.html', {'users': users})

def contactForm(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        Contact.objects.create(name=name, email=email, message=message)
        
        return redirect('/')
               
    return render(request, 'contactForm.html')