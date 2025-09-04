from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Chat(models.Model):
    name = models.CharField(max_length=255, blank=True)
    is_group = models.BooleanField(default=False)
    participants = models.ManyToManyField(User, through='ChatParticipant', related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.is_group:
            return f"Group: {self.name}"
        # return f"Chat with: {self.participants.first().username if self.participants.exists() else 'No Participants'}"
        return f"Chat between: {', '.join([p.username for p in self.participants.all()])}"
    
    
class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    media = models.FileField(upload_to='chat_media/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    seen_by = models.ManyToManyField(User, related_name="seen_messages", blank=True)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]}"

class ChatParticipant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)
    has_exited = models.BooleanField(default=False)
    last_active = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'chat')

    def __str__(self):
        return f"{self.user.username} in {self.chat.name or 'Private Chat'}"