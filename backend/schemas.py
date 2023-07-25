from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# This file contains the models sent in responses to browser as json

class DrugModel(BaseModel):
    drug_concept_id: int
    drug_concept_name: str

    model_config = ConfigDict(
        from_attributes=True
    )


class DrugConditionFilteredModel(BaseModel):
    drug_concept_id: int
    drug_name: str
    condition_concept_id: int
    condition: str
    ingredient_concept_id: int
    ingredient_name: str

    model_config = ConfigDict(
        from_attributes=True
    )


class IRAllExposureOutcomeSummaryOverallModel(BaseModel):
    drug_concept_id: int
    drug_concept_name: str
    outcome_concept_id_str: str
    outcome_concept_name: str
    time_at_risk_id: int
    time_at_risk_name: str
    cohort_type: str
    num_sources: int
    incidence_proportion_range_low: Decimal
    incidence_proportion_estimate: Decimal
    incidence_proportion_range_high: Decimal
    incidence_rate_range_low: Decimal
    incidence_rate_estimate: Decimal
    outcome_concept_id: int

    model_config = ConfigDict(
        from_attributes=True
    )


class IRAllExposureOutcomeSummaryFullModel(BaseModel):
    source_id: int
    source_short_name: str
    source_country: str
    drug_concept_id: int
    drug_concept_name: str
    outcome_concept_id: int
    outcome_concept_name: str
    time_at_risk_id: int
    time_at_risk_name: str
    cohort_type: str
    requires_full_time_at_risk: int
    num_persons_at_risk: int
    person_time_at_risk: Decimal
    num_persons_w_outcome: int
    incidence_rate: Decimal
    incidence_proportion: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )


class DrugConditionResModel(BaseModel):
    condition_concept_id: int
    condition: str
    incidence_proportion_range_low: Decimal
    incidence_proportion_range_high: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )


class ExposureOutcomeResModel(BaseModel):
    outcome_concept_id: int
    outcome_concept_name: str

    model_config = ConfigDict(
        from_attributes=True
    )


class ExposureOutcomeRateResModel(BaseModel):
    incidence_proportion_range_low: Decimal
    incidence_proportion_range_high: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )


class ExposureOutcomeSourceResModel(BaseModel):
    source_short_name: str
    source_country: str
    incidence_proportion: Decimal
    incidence_rate: Decimal
    num_persons_at_risk: int
    requires_full_time_at_risk: str

    model_config = ConfigDict(
        from_attributes=True
    )
