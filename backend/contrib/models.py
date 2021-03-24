from django.db import models
from django.contrib.auth.models import User

# class Recipe(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes', default='none')
#     # spoonacular_recipe_id = models.CharField(max_length=200)
#     title = models.CharField(max_length=200)
#     image = models.CharField(max_length=200)
#     def __str__(self):
#         return self.spoonacular_recipe_id

class Ingredient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ingredients')
    name = models.CharField(max_length=200)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    def __str__(self):
        return self.name
