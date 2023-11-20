from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    # path('', views.index, name='index'),
    path('', views.IndexView.as_view(), name='index'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('placements/', views.PlacementsIndexView.as_view(), name='placements'),
    path('registration/', views.RegistrationView.as_view(), name='registration'),
    path('animals/<int:pk>/', views.AnimalDetailView.as_view(), name='animal_detail'),
    path('post/', views.PostListView.as_view(), name='post_list'),
    path('post/<int:pk>/', views.PostDetailView.as_view(), name='post_detail'),
    path('placements/<int:pk>/', views.PlacementsDetailView.as_view(), name='placement_detail'),
    path('employees/', views.EmployeesListView.as_view(), name='employees'),
    path('faq/', views.FAQView.as_view(), name='faq'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('certificate/', views.CertificateView.as_view(), name='certificate'),
    path('rate/', views.RateListView.as_view(), name='rate_list'),
    path('rate/create/', views.RateCreateView.as_view(), name='rate_create'),
    path('privacy/', views.TermsPrivacyView.as_view(), name='privacy'),
    path('contacts/', views.ContactsView.as_view(), name='contacts'),
    path('lab/', views.LabView.as_view(), name='lab'),
    path("vacancy/", views.VacancyView.as_view(), name="vacancy"),
    path("promo/", views.PromoView.as_view(), name="promo"),
    path("statistics/", views.StatisticsView.as_view(), name="statistics"),
]