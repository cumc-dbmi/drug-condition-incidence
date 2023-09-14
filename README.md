# How Often APP

## Getting Started

### CLONE PROJECT
Clone the project from GitHub
https://github.com/cumc-dbmi/drug-condition-incidence




#### CREATE ENVIRONMENT FILE
On base of project use the .env_template to create .env file that contains the required environment variables and place on base of project.
```
HOWOFTEN_HOST='127.0.0.1'
INCIDENCE_API_BASE_URL='http://127.0.0.1/api/incidence/v2'
VOCAB_BASE_URL='http://api.ohdsi.org/WebAPI/vocabulary/1PCT'

DATASOURCE_DRIVER=postgresql+asyncpg
DATASOURCE_USERNAME=YOUR_PASSWORD
DATASOURCE_PASSWORD=YOUR_PASSWORD
DATASOURCE_HOSTNAME=host.docker.internal
DATASOURCE_PORT=5432
DATASOURCE_DATABASE=howoftendb
DATASOURCE_SCHEMA=dbo

DOCKER_PREFIX=howoften
```


#### BUILD IMAGES
```sh
docker compose build
```
#### LAUNCH CONTAINERS
```sh 
docker compose up -d
```

#### TEST DRIVE APPLICATION
The test data set included for dev/test/ci is the drug "Hydrochlorothiazide".

#### Navigate to Home page
1. Click: [http://127.0.0.1](http://127.0.0.1)

2. At the first input field enter: Hydrochlorothiazide



### USER INTERFACES

**Traefik:**  [http://127.0.0.1:8080/dashboard/#/](http://127.0.0.1:8080/dashboard/#/)

**Swagger UI:** [http://127.0.0.1/ops/incidence/v2/docs](http://127.0.0.1/ops/incidence/v2/docs)

**Redoc UI:** [http://127.0.0.1/ops/incidence/v2/redoc](http://127.0.0.1/ops/incidence/v2/redoc)

**Application:** [http://127.0.0.1](http://127.0.0.1)

#### REST ENDPOINTS

**Open API:** [http://127.0.0.1/ops/incidence/v2/openapi.json](http://127.0.0.1/ops/incidence/v2/openapi.json)

**Application API Base URL:** [http://127.0.0.1/api/incidence/v2](http://127.0.0.1/api/incidence/v2)



