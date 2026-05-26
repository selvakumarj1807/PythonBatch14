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

def deleteUser(request, id):
    user = Contact.objects.get(id=id)
    user.delete()
    return redirect('/')

def updateUser(request, id):
    contact = Contact.objects.get(id=id)
    
    if request.method == 'POST':
        contact.name = request.POST.get('name')
        contact.email = request.POST.get('email')
        contact.message = request.POST.get('message')
        contact.save()
        
        return redirect('/')

    
    return render(request, 'contactForm.html', {'contact': contact})