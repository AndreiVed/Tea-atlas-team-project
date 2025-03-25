#!/bin/sh

python manage.py migrate

python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(email='admin@admin.com').exists():
    User.objects.create_superuser(email='admin@admin.com', password='1qazcde3')
"

python manage.py runserver 0.0.0.0:8000