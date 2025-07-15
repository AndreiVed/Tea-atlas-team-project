FROM python:3.12.3-alpine3.18

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# Збираємо статичні файли для Django Admin. WhiteNoise буде їх подавати.
RUN python manage.py collectstatic --noinput

# Видаляємо блок створення користувача та дозволів для media, якщо використовуєте S3 на продакшені
# Якщо вам потрібен локальний доступ до `media` через volume, це буде керуватися Docker Compose, а не Dockerfile.
# RUN mkdir -p /files/media
# RUN adduser ...
# RUN chown -R my_user /files/media
# RUN chmod -R 755 /files/media

EXPOSE 8000

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]