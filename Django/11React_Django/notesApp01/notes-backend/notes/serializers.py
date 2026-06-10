from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user_id')

    class Meta:
        model = Note
        fields = ('note_id','note_title','note_content','owner','last_update','created_on')
