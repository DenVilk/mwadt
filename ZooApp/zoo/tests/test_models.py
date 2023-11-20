import pytest

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
def test_create_food():
    food_name = 'Сено'
    food = Food.objects.create(food=food_name)
    assert food.food == food_name

@pytest.mark.django_db
def test_create_complex():
    complex_name = 'Сафари'
    complex = Complex.objects.create(complex_name=complex_name)
    assert complex.complex_name == complex_name

@pytest.mark.django_db
def test_create_country():
    country_name = 'Бразилия'
    country = Country.objects.create(country=country_name)
    assert country.country == country_name


@pytest.mark.django_db
def test_create_kind():
    obj_class = Class.objects.create(class_name='Млекопитающие')
    kind_name = 'Лев'
    obj_kind = Kind.objects.create(kind=kind_name, class_name=obj_class)
    assert obj_kind.kind == kind_name
    assert obj_kind.class_name == obj_class