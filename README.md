# Drug Condition Incidence Rate

## Directory Structure

* `client`: HTML5 app using angular
* `incidence-api`: RESTful API using Python flask

## Getting started
To get this application up and running you will need to know the following:
* DATASOURCE_USERNAME
* DATASOURCE_PASSWORD
* DATASOURCE_HOSTNAME

## Create environment file
Copy the .env_template to a .env file and edit it accordingly.
```
INCIDENCE_API_BASE_URL='http://localhost:8080'
VACAB_BASE_URL='http://api.ohdsi.org/WebAPI/vocabulary/1PCT'
DATASOURCE_USERNAME='YOUR_USERNAME'
DATASOURCE_PASSWORD='YOUR_PASWORD'
DATASOURCE_HOSTNAME='YOUR_HOST'
DATASOURCE_PORT='1433'
DATASOURCE_DATABASE='incidence_rate'
DATASOURCE_SCHEMA='dbo'
```


## Build images
```sh
docker compose build
```
## Launch containers
```sh 
docker compose up
```

## Open application
```sh
Open browser and visit http://127.0.0.1
```