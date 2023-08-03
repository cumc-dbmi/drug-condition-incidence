# How Often APP

## Getting Started

#### CREATE ENVIRONMENT FILE
On base of project use the .env_template to create .env file that contains the required environment variables.
```
INCIDENCE_API_BASE_URL='http://localhost/api/incidence/v2'
VACAB_BASE_URL='http://api.ohdsi.org/WebAPI/vocabulary/1PCT'
DATASOURCE_USERNAME='YOUR_USERNAME'
DATASOURCE_PASSWORD='YOUR_PASWORD'
DATASOURCE_HOSTNAME='YOUR_HOST'
DATASOURCE_PORT='1433'
DATASOURCE_DATABASE='incidence_rate'
DATASOURCE_SCHEMA='dbo'
```


#### BUILD IMAGES
```sh
docker compose build
```
#### LAUNCH CONTAINERS
```sh 
docker compose up -d
```

#### USER INTERFACES

**Traefik:**  [http://127.0.0.1:8080/dashboard/#/](http://127.0.0.1:8080/dashboard/#/)

**Swagger UI:** [http://127.0.0.1/ops/incidence/v2/docs](http://127.0.0.1/ops/incidence/v2/docs)

**Redoc UI:** [http://127.0.0.1/ops/incidence/v2/redoc](http://127.0.0.1/ops/incidence/v2/redoc)

**Application:** [http://127.0.0.1](http://127.0.0.1)

#### REST ENDPOINTS

**Open API:** [http://127.0.0.1/ops/incidence/v2/openapi.json](http://127.0.0.1/ops/incidence/v2/openapi.json)

**Application API Base URL:** [http://127.0.0.1/api/incidence/v2](http://127.0.0.1/api/incidence/v2)

#### TEST DRIVE APPLICATION
The test data set include the drug "atorvastatin".

Which drug are you interested in?
ENTER: atorvastatin

