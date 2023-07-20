The following was used to generate the test data.

GENERIC DRUG:
atorvastatin

The api is supported by only 4 tables.


select * from dbo.drug_list
where drug_concept_name = 'atorvastatin';


select * from dbo.drug_condition_filtered
where ingredient_name = 'atorvastatin';


select *
from dbo.IR_all_exposure_outcome_summary_overall
where drug_concept_id in (select distinct(ingredient_concept_id)
                          from dbo.drug_condition_filtered
                          where ingredient_name = 'atorvastatin'
);


select *
from dbo.IR_all_exposure_outcome_summary_full
where drug_concept_id in (select distinct(ingredient_concept_id)
                          from dbo.drug_condition_filtered
                          where ingredient_name = 'atorvastatin'
);