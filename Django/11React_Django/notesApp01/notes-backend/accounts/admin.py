from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('user_email','user_name','is_staff','is_superuser')
    search_fields = ('user_email','user_name')
    ordering = ('user_email',)
    fieldsets = (
        (None, {'fields': ('user_email','password')}),
        ('Personal', {'fields': ('user_name',)}),
        ('Permissions', {'fields': ('is_active','is_staff','is_superuser','groups','user_permissions')}),
        ('Dates', {'fields': ('last_login','last_update','created_on')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_email','user_name','password1','password2'),
        }),
    )

admin.site.register(User, UserAdmin)
