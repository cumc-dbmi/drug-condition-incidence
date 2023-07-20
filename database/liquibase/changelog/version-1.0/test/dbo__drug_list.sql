--liquibase formatted sql

--changeset ecruz165:2
insert into dbo.drug_list (drug_concept_id, drug_concept_name) values (1545958, 'atorvastatin');
