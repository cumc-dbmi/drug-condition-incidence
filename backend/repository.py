from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from models import Drug, DrugConditionFiltered, IRAllExposureOutcomeSummaryOverall, IRAllExposureOutcomeSummaryFull
from schemas import DrugConditionResModel, ExposureOutcomeRateResModel, \
    ExposureOutcomeResModel, ExposureOutcomeSourceResModel
from sql import DRUG_CONDITION_QUERY, INCIDENCE_RATE_QUERY, INCIDENCE_RATE_SOURCE_QUERY, CONDITION_LIST_QUERY


class Repository:
    async def get_all_drugs(self, async_session: async_sessionmaker[AsyncSession]):
        async with async_session() as session:
            statement = select(Drug)
            result = await session.execute(statement)
            return result.scalars()

    async def get_by_id(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int):
        async with async_session() as session:
            statement = select(Drug).filter(Drug.drug_concept_id == drug_concept_id)
            result = await session.execute(statement)
            return result.scalars().one()

    async def get_all_drugConditionsFiltered(self, async_session: async_sessionmaker[AsyncSession]):
        async with async_session() as session:
            statement = select(DrugConditionFiltered)
            result = await session.execute(statement)
            return result.scalars()

    async def get_all_IRAllExposureOutcomeSummaryOverall(self, async_session: async_sessionmaker[AsyncSession]):
        async with async_session() as session:
            statement = select(IRAllExposureOutcomeSummaryOverall)
            result = await session.execute(statement)
            return result.scalars()

    async def get_all_IRAllExposureOutcomeSummaryFull(self, async_session: async_sessionmaker[AsyncSession]):
        async with async_session() as session:
            statement = select(IRAllExposureOutcomeSummaryFull)
            result = await session.execute(statement)
            return result.scalars()

    async def get_drug_conditions(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int):
        async with async_session() as session:
            result = await session.execute(
                text(DRUG_CONDITION_QUERY),
                {"drug_concept_id": drug_concept_id}
            )
            return [DrugConditionResModel(**row) for row in result]

    async def get_exposure_outcomes(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int):
        async with async_session() as session:
            result = await session.execute(
                text(CONDITION_LIST_QUERY),
                {"drug_concept_id": drug_concept_id}
            )
            return [ExposureOutcomeResModel(**row) for row in result]

    async def get_exposure_outcomes_rates(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int,
                                          outcome_concept_id: int, time_at_risk_id: str):
        async with async_session() as session:
            result = await session.execute(
                text(INCIDENCE_RATE_QUERY),
                {"drug_concept_id": drug_concept_id,
                 "outcome_concept_id": outcome_concept_id,
                 "time_at_risk_id": time_at_risk_id}
            )
            return [ExposureOutcomeRateResModel(**row) for row in result]

    async def get_exposure_outcomes_sources(self, async_session: async_sessionmaker[AsyncSession],
                                                  drug_concept_id: int, outcome_concept_id: int, time_at_risk_id: str):
        async with async_session() as session:
            result = await session.execute(
                text(INCIDENCE_RATE_SOURCE_QUERY),
                {"drug_concept_id": drug_concept_id,
                 "outcome_concept_id": outcome_concept_id,
                 "time_at_risk_id": time_at_risk_id}
            )
            return [ExposureOutcomeSourceResModel(**row) for row in result]
