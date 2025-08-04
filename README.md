# Tea Atlas Team Project

## Project Overview
Tea Atlas is a full-stack web application designed to be a central hub for tea enthusiasts. 
It provides a platform to explore, organize, and manage information about various tea types, 
their origins, characteristics, and more. 
The project consists of a robust DRF backend, an interactive JavaScript frontend, and a PostgreSQL database, 
all deployed as Docker containers.

Front-end server deployed on Render:
https://tea-atlas.onrender.com/

Back-end server deployed on Render: 
https://tea-atlas-backend.onrender.com/

## Installing using GitHub

Python3, PostgresSQL and Docker should be already installed



``` shel
git clone https://github.com/AndreiVed/Tea-atlas-team-project.git
cd Tea-atlas-team-project

python3 -m venv venv
source venv/bin/activate

pip install -r backend/requirements.txt

set POSTGRES_DB=tea_atlas_db
set POSTGRES_USER=tea_atlas_user
set POSTGRES_PASSWORD=tea_atlas_password
set POSTGRES_HOST=db
set POSTGRES_PORT=5432
set PGDATA=/var/lib/postgresql/data
set SECRET_KEY=your_secret_key

docker-compose build
docker-compose up
```
For upload common tea data to database:
```
python backend/import_teas.py
```

## Getting access

Admin access:
* email: admin@admin.com 
* password: 1qazcde3

## Features
* Documentation is located at back-end server: api/v1/schema/swagger/

* RESTful API: A robust backend built with Django REST Framework, providing a comprehensive API for all tea-related data.

* Interactive Frontend: A modern user interface developed with JavaScript (using Vite), ensuring a dynamic and engaging user experience.

* Admin Content Management: An integrated Django Admin panel for easy addition, editing, and management of content, including media file uploads.

* User Authentication: An implemented JWT with email confirmation for user authentication and authorization,
An integrated authentication via Google oauth2

* Scalable Database: Integration with Neon DB for structured data storage.

* Documentation is located at api/v1/schema/swagger/

* User can add tea to favorites and view favorites list
* User can filter tea list by country, category, fermentation and impact  
* User can search tea by name
* Cloud Media Storage: Integration with AWS S3 for reliable and scalable storage of all user-uploaded media files, ensuring their persistence across service restarts.)

## Technologies Used
### Backend (API)
* Programming Language: Python 3.12+

* API Framework: Django REST Framework

* Web Server: Gunicorn

* Database Connector: psycopg2-binary, dj-database-url

* CORS: django-cors-headers

* Static Files: WhiteNoise

[//]: # ()
[//]: # (Media Storage: django-storages with AWS S3 &#40;via boto3&#41;)

### Frontend (UI)
* Programming Language: JavaScript

* Build Tool/Runtime: Vite (for fast development and bundling)

* Web Server: Nginx (for serving static files in production)

* Framework: Vue 

![Tea Atlas DB Diagram (2).jpg](../../../Downloads/Tea%20Atlas%20DB%20Diagram%20%282%29.jpg) \
![Screenshot 2025-08-04 at 22.40.34.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.40.34.png)\
![Screenshot 2025-08-04 at 22.39.41.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.39.41.png)\
![Screenshot 2025-08-04 at 22.29.13.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.29.13.png)\
![Screenshot 2025-08-04 at 22.29.36.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.29.36.png)\
![Screenshot 2025-08-04 at 22.29.44.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.29.44.png)\
![Screenshot 2025-08-04 at 22.32.00.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.32.00.png)\
![Screenshot 2025-08-04 at 22.32.10.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.32.10.png)\
![Screenshot 2025-08-04 at 22.32.26.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.32.26.png)\
![Screenshot 2025-08-04 at 22.36.49.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.36.49.png)\
![Screenshot 2025-08-04 at 22.37.54.png](../../../Desktop/Screenshot%202025-08-04%20at%2022.37.54.png)
