FROM python:3.12.3-alpine3.18

LABEL maintrainer="vidernykov.a.e@gmail.com"

# Встановлюємо змінні середовища
ENV PYTHONUNBUFFERED=1

# Встановлюємо робочий каталог
WORKDIR /app

# Копіюємо залежності і встановлюємо їх
COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Копіюємо всі файли проекту
COPY . /app/

# Копіюємо скрипт entrypoint.sh
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Встановлюємо entrypoint
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]