from django.http import JsonResponse, HttpResponse
from .models import Ingredient
from django.core import serializers
import json
import requests

def save_ingredient(request):
    data = json.loads(request.body.decode('utf-8'))
    ingredient_name = data['ingredient_name']
    quantity = data['quantity']
    ingredient = Ingredient(name=ingredient_name, quantity=quantity, user=request.user)
    ingredient.save()
    return HttpResponse('good')

def get_ingredients(request):
    ingredients = request.user.ingredients.all()
    data = serializers.serialize('json', ingredients)
    return JsonResponse(data, safe=False)


def get_recipes(request):
    spoonacular_api_key = '1e39dead13444e7c93b95e003707e3cb'
    ingredients = request.user.ingredients.all()
    ingredient_params = []
    # loops over the orm to get the instances
    for ingredient in ingredients:
        ingredient_params.append(ingredient.name)

    ingredient_params = ','.join(ingredient_params)
    url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + ingredient_params + ','+ '&number=30' + '&apiKey=' + spoonacular_api_key
    response = requests.get(url)
    recipes = json.loads(response.text)
    # for recipe in recipes:
    #     if Recipe.objects.filter(user=request.user, spoonacular_recipe_id=recipe['id']).first():
    #         recipe['favorited'] = True
    #     else:
    #         recipe['favorited'] = False
    # context = {
    #     'recipes' : recipes,
    #
    # }
    return JsonResponse(recipes, safe=False)

def make_recipe(request):
    spoonacular_api_key = '1e39dead13444e7c93b95e003707e3cb'
    data = json.loads(request.body.decode('utf-8'))
    recipe_id = data['recipe_id']
    url = 'https://api.spoonacular.com/recipes/' + str(recipe_id)  + '/information/?apiKey=' + spoonacular_api_key
    response = requests.get(url)
    recipe_information = json.loads(response.text)

    context = {
        'recipe': recipe_information,
    }

    return JsonResponse(context, safe=False)

def clear_table(request):
    ingredients = request.user.ingredients.all()
    ingredients.delete()
    return HttpResponse('ok')
