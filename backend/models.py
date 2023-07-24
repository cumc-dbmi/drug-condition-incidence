from _decimal import Decimal
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


# This file contains the table definitions which bind to orm

class Drug(Base):
    __tablename__ = "drug_list"
    __table_args__ = ({"schema": "dbo"})
    drug_concept_id: Mapped[int] = mapped_column(primary_key=True)
    drug_concept_name: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self) -> str:
        return f"<Drug id={self.drug_concept_id}>"


class DrugConditionFiltered(Base):
    __tablename__ = "drug_condition_filtered"
    __table_args__ = ({"schema": "dbo"})
    drug_concept_id: Mapped[int] = mapped_column(primary_key=True)
    drug_name: Mapped[str] = mapped_column(nullable=False)
    condition_concept_id: Mapped[int] = mapped_column(nullable=True)
    condition: Mapped[str] = mapped_column(nullable=True)
    ingredient_concept_id: Mapped[int] = mapped_column(nullable=False)
    ingredient_name: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self) -> str:
        return f"<DrugConditionFiltered id={self.drug_concept_id}>"


class IRAllExposureOutcomeSummaryOverall(Base):
    __tablename__ = "ir_all_exposure_outcome_summary_overall"
    __table_args__ = ({"schema": "dbo"})
    drug_concept_id: Mapped[int] = mapped_column(primary_key=True)
    drug_concept_name: Mapped[str] = mapped_column(nullable=False)
    outcome_concept_id_str: Mapped[str] = mapped_column(nullable=False)
    outcome_concept_name: Mapped[str] = mapped_column(nullable=False)
    time_at_risk_id: Mapped[int] = mapped_column(nullable=False)
    time_at_risk_name: Mapped[str] = mapped_column(nullable=False)
    cohort_type: Mapped[str] = mapped_column(nullable=False)
    num_sources: Mapped[int] = mapped_column(nullable=True)
    incidence_proportion_range_low: Mapped[Decimal] = mapped_column(nullable=True)
    incidence_proportion_estimate: Mapped[Decimal] = mapped_column(nullable=True)
    incidence_proportion_range_high: Mapped[Decimal] = mapped_column(nullable=True)
    incidence_rate_range_low: Mapped[Decimal] = mapped_column(nullable=True)
    incidence_rate_estimate: Mapped[Decimal] = mapped_column(nullable=True)
    outcome_concept_id: Mapped[int] = mapped_column(nullable=True)

    def __repr__(self) -> str:
        return f"<IRAllExposureOutcomeSummaryOverall id={self.drug_concept_id}>"


class IRAllExposureOutcomeSummaryFull(Base):
    __tablename__ = "ir_all_exposure_outcome_summary_full"
    __table_args__ = ({"schema": "dbo"})
    source_id: Mapped[int] = mapped_column(primary_key=True)
    source_short_name: Mapped[str] = mapped_column(nullable=True)
    source_country: Mapped[str] = mapped_column(nullable=True)
    drug_concept_id: Mapped[int] = mapped_column(nullable=False)
    drug_concept_name: Mapped[str] = mapped_column(nullable=False)
    outcome_concept_id: Mapped[int] = mapped_column(nullable=True)
    outcome_concept_name: Mapped[str] = mapped_column(nullable=False)
    time_at_risk_id: Mapped[int] = mapped_column(nullable=False)
    time_at_risk_name: Mapped[str] = mapped_column(nullable=False)
    cohort_type: Mapped[str] = mapped_column(nullable=False)
    requires_full_time_at_risk: Mapped[int] = mapped_column(nullable=False)
    num_persons_at_risk: Mapped[int] = mapped_column(nullable=True)
    person_time_at_risk: Mapped[Decimal] = mapped_column(nullable=True)
    num_persons_w_outcome: Mapped[int] = mapped_column(nullable=True)
    incidence_rate: Mapped[Decimal] = mapped_column(nullable=True)
    incidence_proportion: Mapped[Decimal] = mapped_column(nullable=True)


def __repr__(self) -> str:
    return f"<IRAllExposureOutcomeSummaryFull id={self.source_id}>"
