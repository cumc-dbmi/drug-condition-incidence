from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from models import Drug, DrugConditionFiltered, IRAllExposureOutcomeSummaryOverall, IRAllExposureOutcomeSummaryFull


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

    async def get_drug_conditions_by_inception_id(self, async_session: async_sessionmaker[AsyncSession]):
        async with async_session() as session:
            statement = select(DrugConditionFiltered).join(IRAllExposureOutcomeSummaryOverall)
            result = await session.execute(statement)
            return result.scalars()

