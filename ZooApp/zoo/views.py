import logging
from django.shortcuts import (
    redirect,
    render,
)
from django.contrib.auth import login
from django.conf import settings
from django.http import HttpResponse
from zoo.models import (
    FAQ,
    Ads,
    Animal,
    Client,
    Employee,
    Placement,
    Post,
    Rate,
    Settings,
)
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from zoo.forms import (
    RateForm,
    RegistrationForm,
)
import plotly.express as px

# Создаем логгер
logger = logging.getLogger("main")


class IndexView(generic.View):
    def get(self, request, *args, **kwargs):
        last_post = Post.objects.order_by("-created_at").first()
        animals = Animal.objects.all()
        placements = Placement.objects.all()
        return render(
            request,
            "animation.html",
            {
                "placements": placements,
                "animals": animals,
                "last_post": last_post,
            },
        )


class RegistrationView(generic.View):
    template_name = "registration/registration.html"

    def get(self, request, *args, **kwargs):
        form = RegistrationForm()
        return render(request, self.template_name, {"form": form})

    def post(self, request, *args, **kwargs):
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)

            logger.info(f'New user {request.POST.get("username")} was added.')
            client = Client.objects.create(
                username=request.POST.get("username"),
                first_name=request.POST.get("first_name"),
                last_name=request.POST.get("last_name"),
                address=request.POST.get("address"),
                phone_number=request.POST.get("phone_number"),
            )
            client.save()

            return redirect("index")

        logger.info(f"Invalid data in the registration form.")
        return render(request, self.template_name, {"form": form})


class PostDetailView(generic.DetailView):
    template_name = "post_detail.html"
    model = Post


class PostListView(generic.ListView):
    template_name = "post_list.html"
    model = Post
    queryset = Post.objects.all().order_by("-created_at")


class AnimalDetailView(generic.DetailView):
    template_name = "animal_detail.html"
    model = Animal


class EmployeesListView(UserPassesTestMixin, generic.ListView):
    template_name = "employees.html"
    context_object_name = "employee"
    model = Employee

    def test_func(self) -> bool | None:
        return self.request.user.is_superuser

    def get_queryset(self):
        return Employee.objects.all()


class PlacementsIndexView(generic.ListView):
    template_name = "placements.html"
    context_object_name = "placements"

    def get_queryset(self):
        return Placement.objects.order_by("name")


class PlacementsDetailView(generic.DetailView):
    template_name = "animals_in_placements.html"
    model = Placement


class FAQView(generic.ListView):
    template_name = "faq.html"
    queryset = FAQ.objects.all().order_by("created_at")


class AboutView(generic.View):
    template_name = "about.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class CertificateView(generic.View):
    template_name = "certificate.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class RateCreateView(LoginRequiredMixin, generic.View):
    form_class = RateForm
    template_name = "rate_create.html"

    def get(self, request, *args, **kwargs):
        form = self.form_class()

        return render(
            request,
            self.template_name,
            {
                "form": form,
            },
        )

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            rate = Rate(
                author=request.user,
                rating=form.cleaned_data["rating"],
                content=form.cleaned_data["content"],
            )
            rate.save()
            return redirect("/rate/")

        return render(
            request,
            self.template_name,
            {
                "form": form,
            },
        )


class RateListView(generic.ListView):
    model = Rate
    template_name = "rate_list.html"


class TermsPrivacyView(generic.View):
    template_name = "terms_privacy.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class ContactsView(generic.ListView):
    model = Employee
    template_name = "contacts.html"
    queryset = Employee.objects.all()


class LabView(generic.View):
    template_name = "lab.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    

class CustonView(generic.View):
    template_name = "custom.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class AnimationView(generic.View):
    template_name = "animation.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class VacancyView(generic.View):
    template_name = "vacancy.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class PromoView(generic.View):
    template_name = "promo.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class StatisticsView(generic.View):
    template_name = "statistics.html"

    def get(self, request, *args, **kwargs):
        animals = Animal.objects.all().order_by("arrival_date")
        count = {}
        for animal in animals:
            count[animal.arrival_date] = count.get(animal.arrival_date, 0) + 1
        l = sorted(list(count.keys()))
        res = [count[l[0]]]
        for item in l[1:]:
            res.append(res[-1]+count[item])
        td=px.area(
            x=l,
            y=res,
            title='Arrived animals',
            labels={'x':'Date', 'y':"Count"}
        )

        posts = Post.objects.all().order_by('created_at')
        count = {}
        for animal in posts:
            print(animal.created_at)
            count[animal.created_at] = count.get(animal.created_at, 0) + 1
        l = sorted(list(count.keys()))
        res = [count[l[0]]]
        for item in l[1:]:
            res.append(res[-1]+count[item])
        hd=px.area(
            x=l,
            y=res,
            title='Created posts',
            labels={'x':'Date', 'y':"Count"}
        )
        return render(
            request,
            self.template_name,
            {
                'animals_stat': td.to_html(),
                'posts_stat': hd.to_html(),
            }
        )

class Lab3(generic.View):
    template_name = "lab3.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        interval = Settings.objects.get(id=1)
        if "interval" in request.POST.keys():
            interval.value = str(request.POST["interval"])
            interval.save()
        return render(request, self.template_name)


def advertisement(request):
    import json
    p = []
    for ad in Ads.objects.all():
        p.append({
            "name" : ad.name,
            "link" : ad.link,
            "image": ad.photo.url,
        })
    interval, created = Settings.objects.get_or_create(name="interval", defaults={"value": 5})
    l = {
        "photos": p,
        "interval": int(interval.value) * 1000
    }
    return HttpResponse(json.dumps(l), content_type="application/json")
