from typing import List

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from models import Drug, DrugConditionFiltered, IRAllExposureOutcomeSummaryOverall, IRAllExposureOutcomeSummaryFull
from sql import DRUG_CONDITION_QUERY, INCIDENCE_RATE_QUERY, INCIDENCE_RATE_SOURCE_QUERY, CONDITION_LIST_QUERY


def convertToRowsfDictionary(result, column_names):
    row_dicts = []
    for row in result:
        row_dict = {column: getattr(row, column, None) for column in column_names}
        row_dicts.append(row_dict)
    return row_dicts


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
            # Explicitly list out the expected column names
            column_names: list[str] = ["outcome_concept_id", "outcome_concept_name","incidence_proportion_range_low","incidence_proportion_range_high"]
            return convertToRowsfDictionary(result, column_names)

    async def get_exposure_outcomes(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int):
        async with async_session() as session:
            result = await session.execute(
                text(CONDITION_LIST_QUERY),
                {"drug_concept_id": drug_concept_id}
            )
            # Explicitly list out the expected column names
            column_names: list[str] = ["outcome_concept_id", "outcome_concept_name"]
            return convertToRowsfDictionary(result, column_names)

    async def get_exposure_outcomes_rates(self, async_session: async_sessionmaker[AsyncSession], drug_concept_id: int,
                                          outcome_concept_id: int, time_at_risk_id: str):
        async with async_session() as session:
            result = await session.execute(
                text(INCIDENCE_RATE_QUERY),
                {"drug_concept_id": drug_concept_id,
                 "outcome_concept_id": outcome_concept_id,
                 "time_at_risk_id": time_at_risk_id}
            )
            # Explicitly list out the expected column names
            column_names: list[str] = ["incidence_proportion_range_low", "incidence_proportion_range_high"]
            return convertToRowsfDictionary(result, column_names)

    async def get_exposure_outcomes_sources(self, async_session: async_sessionmaker[AsyncSession],
                                                  drug_concept_id: int, outcome_concept_id: int, time_at_risk_id: str):
        async with async_session() as session:
            result = await session.execute(
                text(INCIDENCE_RATE_SOURCE_QUERY),
                {"drug_concept_id": drug_concept_id,
                 "outcome_concept_id": outcome_concept_id,
                 "time_at_risk_id": time_at_risk_id}
            )
        # Explicitly list out the expected column names
        column_names: list[str] = ["source_short_name","source_country","incidence_proportion","incidence_rate","num_persons_at_risk","requires_full_time_at_risk"]
        return convertToRowsfDictionary(result, column_names)
