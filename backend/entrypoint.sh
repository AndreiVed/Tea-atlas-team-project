#!/bin/sh

#python manage.py migrate
#
#python manage.py shell -c "
#from django.contrib.auth import get_user_model;
#User = get_user_model();
#if not User.objects.filter(email='admin@admin.com').exists():
#    User.objects.create_superuser(email='admin@admin.com', password='1qazcde3')
#"
#
#python manage.py runserver 0.0.0.0:8000

#!/bin/sh

# Застосувати міграції
echo "Applying database migrations..."
python manage.py migrate --noinput

# Створити суперкористувача, якщо його немає
# Цей скрипт запускається при кожному старті контейнера, тому перевіряємо його існування.
echo "Creating superuser if it doesn't exist..."
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(email='admin@admin.com').exists():
    User.objects.create_superuser(email='admin@admin.com', password='1qazcde3')
"

# Визначити порт для прослуховування
# Render інжектиє змінну $PORT. Локально використовуємо 8000.
LISTEN_PORT=${PORT:-8000}

# Вибір сервера залежить від змінної середовища ENVIRONMENT (або $PORT на Render)
# Локально ENVIRONMENT може бути 'development', на Render її не буде, але буде $PORT
if [ -n "$PORT" ]; then # Якщо змінна $PORT існує (тобто ми на Render)
    echo "Running Gunicorn for production on port $LISTEN_PORT..."
    exec gunicorn tea_atlas_service.wsgi:application --bind 0.0.0.0:"$LISTEN_PORT"
else
    echo "Running Django development server on port $LISTEN_PORT..."
    exec python manage.py runserver 0.0.0.0:"$LISTEN_PORT"
fi