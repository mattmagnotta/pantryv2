from contrib.views import save_ingredient
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from contrib import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("save_ingredient/", save_ingredient, name="save_ingredient"),
    path("get_ingredients/", views.get_ingredients, name="get_ingredients"),
    path("get_recipes/", views.get_recipes, name="get_recipes"),
    path("clear_table/", views.clear_table, name="clear_table"),
    path("", include('userapp.urls')),
]
