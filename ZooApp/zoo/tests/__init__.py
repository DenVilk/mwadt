import pytest
from pytest_django.fixtures import django_db_setup

pytest_plugins = ["pytest_django"]

def pytest_configure(config):
    config.addinivalue_line("DJANGO_SETTINGS_MODULE", "ZooApp.settings")
    config.addfixture(django_db_setup)