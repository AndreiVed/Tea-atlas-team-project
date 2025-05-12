# Tea Atlas Team Project

# Tea Atlas API
**Tea Atlas API ** is a REST API designed 
to introduce users to the rich world of tea culture. 
It provides comprehensive information about various teas 
from different countries, including their fermentation levels, 
flavor descriptors, and other essential details.

## Installing using GitHub

Python3 must be already installed
Install PostgresSQL and create DB

``` shel
git clone https://github.com/AndreiVed/Tea-atlas-team-project.git
cd Tea-atlas-team-project/backend

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

set POSTGRES_DB=tea_atlas_db
set POSTGRES_USER=tea_atlas_user
set POSTGRES_PASSWORD=tea_atlas_password
set POSTGRES_HOST=db
set POSTGRES_PORT=5432
set PGDATA=/var/lib/postgresql/data
set SECRET_KEY=your_secret_key


python manage.py migrate
python manage.py runserver 
```

## Run with docker

Docker should be installed

``` shel
docker-compose build
docker-compose up
```

## Getting access

* admin access:
    email: admin@admin.com
    password: 1qazcde3

## Features

* JWT authentication
* Admin panel
* Documentation is located at api/v1/schema/swagger/
* Managing service content via admin panel
* Add image to tea info
* User authentication via JWT with email and password
* Email verification 
* User authentication via Google auth 
* User can add tea to favorites and view favorites list
* User can filter tea list by country, category, fermentation and impact  
* User can search tea by name