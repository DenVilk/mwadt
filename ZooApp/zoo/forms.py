from django import forms
from django.contrib.auth.forms import UserCreationForm
from zoo.models import User

class RegistrationForm(UserCreationForm):
    address = forms.CharField(max_length=100, required=True)
    phone_number = forms.CharField(max_length=11, required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
        )


class RateForm(forms.Form):
    rating = forms.IntegerField(min_value=0, max_value=10)
    content = forms.CharField(widget=forms.Textarea)