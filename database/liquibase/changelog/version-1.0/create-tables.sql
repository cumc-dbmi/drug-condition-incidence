--liquibase formatted sql

--changeset ecruz165:1
CREATE SCHEMA IF NOT EXISTS dbo;




/*  401,272 */
create table IF NOT EXISTS dbo.drug_condition
(
    drug_concept_id      int          not null,
    drug_name            varchar(255) not null,
    condition_concept_id int,
    condition            varchar(200)
);

CREATE INDEX IF NOT EXISTS drug_concept_id_idx
ON dbo.drug_condition (drug_concept_id);

CREATE INDEX IF NOT EXISTS drug_condition_idx
ON dbo.drug_condition (drug_concept_id, condition_concept_id);
/* START: should be applied when bulk data is loaded */
-- CLUSTER dbo.drug_condition USING dbo.drug_concept_id_idx;
/* END: should be applied when bulk data is loaded */




/*   32,5370 */
create table IF NOT EXISTS dbo.drug_condition_filtered
(
    drug_concept_id       int          not null,
    drug_name             varchar(255) not null,
    condition_concept_id  int,
    condition             varchar(200),
    ingredient_concept_id int          not null,
    ingredient_name       varchar(255) not null
);




/*   2,185 */
create table IF NOT EXISTS dbo.drug_list
(
    drug_concept_id   int          not null,
    drug_concept_name varchar(255) not null
);




/*   9,310 */
create table IF NOT EXISTS dbo.drug_list_all
(
    drug_concept_id   int          not null,
    drug_concept_name varchar(255) not null
);




/*   215,678,657 */
create table IF NOT EXISTS dbo.IR_all_exposure_outcome_summary_full
(
    source_id                  bigint        not null,
    source_short_name          varchar(255),
    source_country             varchar(255),
    drug_concept_id            bigint        not null,
    drug_concept_name          varchar(800) not null,
    outcome_concept_id         bigint,
    outcome_concept_name       varchar(500) not null,
    time_at_risk_id            bigint        not null,
    time_at_risk_name          varchar(500) not null,
    cohort_type                varchar(200) not null,
    requires_full_time_at_risk bigint        not null,
    num_persons_at_risk        bigint,
    person_time_at_risk        double precision,
    num_persons_w_outcome      bigint,
    incidence_rate             double precision,
    incidence_proportion       double precision
);

CREATE INDEX IF NOT EXISTS idx_to_share_drug_time_outcome
    on dbo.IR_all_exposure_outcome_summary_full (drug_concept_id, time_at_risk_id, outcome_concept_id) include (source_short_name,
                                                                                                                source_country,
                                                                                                                incidence_rate,

                                                                                                                incidence_proportion);
/*   52,009,644 */
CREATE TABLE IF NOT EXISTS dbo.IR_all_exposure_outcome_summary_overall
(
    drug_concept_id                 bigint        not null,
    drug_concept_name               varchar(800) not null,
    outcome_concept_id_str          varchar(500),
    outcome_concept_name            varchar(500) not null,
    time_at_risk_id                 bigint        not null,
    time_at_risk_name               varchar(255) not null,
    cohort_type                     varchar(255) not null,
    num_sources                     bigint,
    incidence_proportion_range_low  numeric(24, 12),
    incidence_proportion_estimate   numeric(38, 12),
    incidence_proportion_range_high numeric(24, 12),
    incidence_rate_range_low        numeric(38, 20),
    incidence_rate_estimate         numeric(38, 20),
    incidence_rate_range_high       numeric(38, 20),
    outcome_concept_id              bigint
);

CREATE INDEX IF NOT EXISTS idx_overall_drug_time_outcome
    on dbo.IR_all_exposure_outcome_summary_overall (drug_concept_id, time_at_risk_id, outcome_concept_id, cohort_type) include (incidence_proportion_range_low, incidence_proportion_range_high);

CREATE INDEX IF NOT EXISTS idx_time_at_risk_cohort_type
    on dbo.IR_all_exposure_outcome_summary_overall (time_at_risk_id, cohort_type) include (drug_concept_id, drug_concept_name);




/*   8,546 */
create table IF NOT EXISTS dbo.meddra_to_snomed
(
    meddra_concept_id_raw varchar(50),
    meddra_concept_name   varchar(200),
    snomed_concept_id_raw varchar(50),
    snomed_concept_name   varchar(200),
    meddra_concept_id     int,
    snomed_concept_id     int
);




/*   154,646 */
create table  IF NOT EXISTS  dbo.spl_to_rxnorm
(
    spl_concept_id    int          not null,
    spl_drug_name     varchar(255) not null,
    set_id            varchar(50)  not null,
    rxnorm_concept_id int          not null,
    rxnorm_name       varchar(255) not null,
    rxnorm_code       varchar(50)  not null
);




/*   1,193,445 */
create table  IF NOT EXISTS dbo.splicer
(
    DRUG_CONCEPT_ID        int,
    SPL_ID                 varchar(50),
    SET_ID                 varchar(50),
    TRADE_NAME             varchar(150),
    SPL_DATE               date,
    SPL_SECTION            varchar(50),
    CONDITION_CONCEPT_ID   varchar(50),
    CONDITION_PT           varchar(100),
    CONDITION_LLT          varchar(100),
    CONDITION_SOURCE_VALUE varchar(150),
    parseMethod            varchar(50),
    sentenceNum            int,
    labdirection           varchar(50),
    drugfreq               varchar(20),
    "exclude"                varchar(10),
    ingredient_count       int
);