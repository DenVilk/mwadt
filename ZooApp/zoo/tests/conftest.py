import pytest
from django.test import Client
from django.urls import reverse
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

@pytest.fixture
def client():
    # Создаем экземпляр Django Client для отправки запросов
    client = Client()
    return client


@pytest.fixture
def animal():
    # Создаем объекты, необходимые для создания экземпляра Animal
    food = Food.objects.create(food="Some Food")
    complex = Complex.objects.create(complex_name="Some Complex")
    placement = Placement.objects.create(name="Some Placement", number=1, reservoir=True, heating=False, complex_area=complex)
    country = Country.objects.create(country="Some Country")
    class_obj = Class.objects.create(class_name="Some Class")
    kind = Kind.objects.create(kind="Some Kind", class_name=class_obj)
    
    # Создаем экземпляр Animal
    animal = Animal.objects.create(age=5, description="Some Description", gender="M", arrival_date="2023-06-05",
                                   placement=placement, country=country, kind=kind)
    animal.food.add(food)  # Добавляем связь с объектом Food
    
    yield animal
    
    # Удаляем созданные объекты после завершения теста
    food.delete()
    complex.delete()
    placement.delete()
    country.delete()
    class_obj.delete()
    kind.delete()
    animal.delete()