from django.shortcuts import render, reverse
from django.http import JsonResponse,HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
import json


def register_user(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data['username']
    email = data['email']
    password = data['password']
    if User.objects.filter(username=username).exists():
        return HttpResponse('username taken')
    elif User.objects.filter(email=email).exists():
        return HttpResponse('email taken')
    else:
        user = User.objects.create_user(username, email, password)
        login(request, user)
    return HttpResponse('signed up')

def login_user(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data['username']
    password = data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None: # username and password matched a user
        login(request, user)
        return HttpResponse('logged in')
    else:
        print('user not in ')
        return HttpResponse('invalid login')


def get_user(request):
    user = request.user.username
    data = [{'user':user,
             'loggedIn':'true'
            }]
    if user != '':
        return JsonResponse(data, safe=False)
    else:
        return HttpResponse('No User')


def logout_user(request):
    logout(request)
    return HttpResponse('User Logged Out')
