from typing import List

import uvicorn
from fastapi import FastAPI, APIRouter
from sqlalchemy.ext.asyncio import async_sessionmaker

import config
from config import settings
from db import engine
from repository import Repository
from schemas import DrugModel, DrugConditionFilteredModel, IRAllExposureOutcomeSummaryOverallModel, \
    IRAllExposureOutcomeSummaryFullModel, DrugConditionResModel, \
    ExposureOutcomeRateResModel, \
    ExposureOutcomeResModel, ExposureOutcomeSourceResModel

# REFERENCED THIS VIDEO
# https://www.youtube.com/watch?v=nC9ob8xM3AM
# https://github.com/jod35/Noted-FastAPI/tree/main
# https://github.com/roy-pstr/fastapi-custom-exception-handlers-and-logs
# https://mergeboard.com/blog/6-multitenancy-fastapi-sqlalchemy-postgresql/
# https://betterprogramming.pub/how-to-execute-plain-sql-queries-with-sqlalchemy-627a3741fdb1
# https://medium.com/@steveYeah/using-generics-in-python-99010e5056eb
# https://towardsdatascience.com/how-we-optimized-postgresql-queries-100x-ff52555eabe
# https://loadforge.com/guides/quick-tips-to-improve-performance-of-your-fastapi-application
# https://www.codeproject.com/Articles/5307399/Generic-Repository-with-SQLAlchemy-and-Python
# https://www.eliasbrange.dev/posts/observability-with-fastapi-aws-lambda-powertools/
# https://earthly.dev/blog/docker-and-makefiles/

app = FastAPI(
    title=settings.title,
    version=settings.version,
    description=settings.description,
    root_path=settings.openapi_prefix,
    docs_url=settings.docs_url,
    openapi_url=settings.openapi_url,
    redoc_url=settings.redoc_url
)
router = APIRouter()

session = async_sessionmaker(
    bind=engine,
    expire_on_commit=False
)

repository = Repository()


@router.get("/drugs", response_model=List[DrugModel])
async def get_all_drugs():
    drugs = await repository.get_all_drugs(session)
    return drugs


@router.get("/drugs/{drug_concept_id}", response_model=DrugModel)
async def get_drug_by_id(drug_concept_id: int) -> dict:
    drug = await repository.get_by_id(session, drug_concept_id)
    return drug


@router.get("/drug-conditions-filtered", response_model=List[DrugConditionFilteredModel])
async def get_all_drugConditionsFiltered():
    drugs = await repository.get_all_drugConditionsFiltered(session)
    return drugs


@router.get("/ir-all-exposure-outcome-summary-overall", response_model=List[IRAllExposureOutcomeSummaryOverallModel])
async def get_all_IRAllExposureOutcomeSummaryOverall():
    drugs = await repository.get_all_IRAllExposureOutcomeSummaryOverall(session)
    return drugs


@router.get("/ir-all-exposure-outcome-summary-full", response_model=List[IRAllExposureOutcomeSummaryFullModel])
async def get_all_IRAllExposureOutcomeSummaryFull():
    drugs = await repository.get_all_IRAllExposureOutcomeSummaryFull(session)
    return drugs


@router.get("/drug-conditions/{drug_concept_id}", response_model=List[DrugConditionResModel])
async def get_drug_conditions(drug_concept_id: int):
    result = await repository.get_drug_conditions(session, drug_concept_id)
    return [DrugConditionResModel(**row) for row in result]


@router.get("/exposure-outcomes/{drug_concept_id}", response_model=List[ExposureOutcomeResModel])
async def get_exposure_outcomes(drug_concept_id: int):
    result = await repository.get_exposure_outcomes(session, drug_concept_id)
    return [ExposureOutcomeResModel(**row) for row in result]


@router.get("/exposure-outcomes/{drug_concept_id}/rates/{outcome_concept_id}/{time_at_risk_id}",
            response_model=List[ExposureOutcomeRateResModel])
async def get_exposure_outcome_rates(drug_concept_id: int, outcome_concept_id: int, time_at_risk_id: str):
    result = await repository.get_exposure_outcomes_rates(session, drug_concept_id, outcome_concept_id, time_at_risk_id)
    return [ExposureOutcomeRateResModel(**row) for row in result]


@router.get("/exposure-outcomes/{drug_concept_id}/sources/{outcome_concept_id}/{time_at_risk_id}",
            response_model=List[ExposureOutcomeSourceResModel])
async def get_exposure_outcome_sources(drug_concept_id: int, outcome_concept_id: int, time_at_risk_id: str):
    result = await repository.get_exposure_outcomes_sources(session, drug_concept_id, outcome_concept_id, time_at_risk_id)
    return [ExposureOutcomeSourceResModel(**row) for row in result]


app.include_router(router, prefix="/api/incidence/v2")

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
