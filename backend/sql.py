DRUG_LIST_QUERY = """
SELECT drug_list.drug_concept_id, drug_list.drug_concept_name 
FROM dbo.drug_list
"""

DRUG_CONDITION_QUERY = """
SELECT DISTINCT condition_concept_id AS outcome_concept_id, 
  condition AS outcome_concept_name,
  f.incidence_proportion_range_low,
  f.incidence_proportion_range_high 
FROM dbo.drug_condition_filtered d
JOIN dbo.ir_all_exposure_outcome_summary_overall f
  ON d.condition_concept_id = f.outcome_concept_id 
  AND d.ingredient_concept_id = f.drug_concept_id
WHERE ingredient_concept_id = :drug_concept_id AND time_at_risk_id = 365
AND cohort_type = 'First diagnosis of'
ORDER BY condition
"""

CONDITION_LIST_QUERY = """
SELECT DISTINCT outcome_concept_id,
  outcome_concept_name
FROM dbo.ir_all_exposure_outcome_summary_overall f
WHERE drug_concept_id = :drug_concept_id AND time_at_risk_id = 365
AND cohort_type = 'First diagnosis of'
ORDER BY outcome_concept_name
"""

INCIDENCE_RATE_QUERY = """
SELECT
  incidence_proportion_range_low, 
  incidence_proportion_range_high 
FROM dbo.ir_all_exposure_outcome_summary_overall
WHERE drug_concept_id = :drug_concept_id
AND outcome_concept_id = :outcome_concept_id  
AND time_at_risk_id = :time_at_risk_id
AND cohort_type = 'First diagnosis of'
"""

INCIDENCE_RATE_SOURCE_QUERY = """
SELECT source_short_name, 
  source_country, 
  incidence_proportion, 
  incidence_rate,
  num_persons_at_risk,
  CASE
	WHEN requires_full_time_at_risk = 1  THEN 'Yes'
	ELSE 'No'
  END as requires_full_time_at_risk 
FROM dbo.ir_all_exposure_outcome_summary_full
WHERE drug_concept_id = :drug_concept_id 
AND outcome_concept_id = :outcome_concept_id  
AND time_at_risk_id = :time_at_risk_id
AND cohort_type = 'First diagnosis of'
ORDER BY incidence_proportion DESC
"""
