from django.contrib import admin

from .models import (
    FAQ,
    Ads,
    Animal,
    Class,
    Complex,
    Country,
    Employee,
    Food,
    Job,
    Kind,
    Placement,
    Settings,
    User,
    Post,
)


class AnimalAdminCustom(admin.ModelAdmin):
    list_display = ("get_kind_name", "age", "country", "placement")
    list_filter = ("country",)
    search_fields = ("id",)

    def get_kind_name(self, obj):
        return obj.kind.kind


admin.site.register(Animal, AnimalAdminCustom)
admin.site.register(Food)
admin.site.register(Complex)
admin.site.register(Placement)
admin.site.register(Employee)
admin.site.register(Country)
admin.site.register(Class)
admin.site.register(Kind)
admin.site.register(Job)
admin.site.register(User)
admin.site.register(Post)
admin.site.register(FAQ)
admin.site.register(Settings)
admin.site.register(Ads)