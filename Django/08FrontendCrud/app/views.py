from django.shortcuts import redirect, render

from app.forms import ContactForm
from app.models import Contact

# Create your views here.

def index(request):
    users = Contact.objects.all()
    return render(request, 'index.html', {'users': users})

def contactForm(request):
    form = ContactForm(request.POST)
    
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('/') 

    return render(request, 'contactForm.html', {'form': form}) 
               
    return render(request, 'contactForm.html', {'form': form})

def deleteUser(request, id):
    user = Contact.objects.get(id=id)
    user.delete()
    return redirect('/')

def updateUser(request, id):
    contact = Contact.objects.get(id=id)
    form = ContactForm(instance=contact) 
    
    if request.method == 'POST':
        form = ContactForm(request.POST, instance=contact)
        if form.is_valid():
            form.save()
        return redirect('/')

    
    return render(request, 'contactForm.html', {'contact': contact, 'form': form})