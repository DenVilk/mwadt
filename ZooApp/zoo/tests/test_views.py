import datetime
import pytest
from django.urls import reverse
from django.test import Client
from zoo.models import (
    Animal,
    Kind,
    Class,
    Food,
    Complex,
    Placement, 
    Country,
    Job,
    Employee,  
)


@pytest.mark.django_db
def test_index_view(client: Client):
     # Получаем URL для представления 'index'
    url = reverse('index')
    # Отправляем GET-запрос по указанному URL
    response = client.get(url)
    assert response.status_code == 200


# Фикстура будет автоматически создавать экземпляр Animal и связанные с ним объекты перед выполнением теста
@pytest.mark.django_db
def test_animal_detail_view(client: Client, animal):
    url = reverse('animal_detail', args=[animal.id])
    response = client.get(url)
    assert response.status_code == 200