# Tea Atlas Team Project

# Tea Atlas API
**Tea Atlas API ** is a REST API designed 
to introduce users to the rich world of tea culture. 
It provides comprehensive information about various teas 
from different countries, including their fermentation levels, 
flavor descriptors, and other essential details.

## Installing using GitHub

Python3 must be already installed

``` shel
git clone https://github.com/AndreiVed/Tea-atlas-team-project.git
cd Tea-atlas-team-project/backend
```

## Run a local server with SQLite3 database

``` shel
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

set SECRET_KEY=your_secret_key
set USE_POSTGRES=False
 
python manage.py migrate
python manage.py createsuperuser
    email: admin@admin.com
    password: 1qazcde3
    
python manage.py runserver 
```

## Run with docker
Install PostgresSQL and create DB
Docker should be installed

``` shel
set USE_POSTGRES=True
set POSTGRES_DB=tea_atlas_db
set POSTGRES_USER=tea_atlas_user
set POSTGRES_PASSWORD=tea_atlas_password
set POSTGRES_HOST=db
set POSTGRES_PORT=5432
set PGDATA=/var/lib/postgresql/data

docker-compose build
docker-compose up
```

## Getting access

* admin access:
    email: admin@admin.com
    password: 1qazcde3

## For use GOOGLE AUTH Service

Set your client on https://console.cloud.google.com/auth
Set .env file:
``` shel
GOOGLE_OAUTH_CLIENT_ID=<your_cliend_id>
GOOGLE_OAUTH_CLIENT_SECRET=<your_cliend_secret>
GOOGLE_OAUTH_PROJECT_ID=tea-<your_project_id>
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:8000/api/v1/google_auth/callback/
```

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
