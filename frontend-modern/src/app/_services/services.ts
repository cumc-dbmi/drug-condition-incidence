import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";
import axios from "axios";

async function fetchDrugs(): Promise<Drug[]> {
    console.log("fetchDrugs");
    const res = await fetch(
        'http://localhost:3001/drugs',
);
    console.log("fetchDrugs");
    return res.json();
}

async function fetchDrugConditionsById(drugId: number , signal: RequestInit | undefined): Promise<DrugCondition[]> {
    const res = await fetch(
        `http://localhost:3001/drug-conditions`, signal);
    return res.json();
}

export async function getDrugListAsListboxItems(): Promise<AutosuggestListboxItem[]> {
    const input: Drug[] = await fetchDrugList();
    return input.map(item => ({
        label: item.drug_concept_name,
        value: item.drug_concept_id
    }));
}
export const fetchDrugList = async () => {
    console.log("fetchDrugList");
    const response = await axios.get('http://localhost:3001/drugs');
    return response.data;
};

export async function  getDrugConditionAsListBoxItems(drugConceptId:number): Promise<AutosuggestListboxItem[]> {
    const input: DrugCondition[] = await fetchDrugConditionList(drugConceptId);
    return input.map(item => ({
        label: item.outcome_concept_name,
        value: item.outcome_concept_id
    }));
}
export const fetchDrugConditionList = async (drugConceptId: number) => {
    console.log("fetchDrugConditionList using drug concept id: "+ drugConceptId);
    const response = await axios.get('http://localhost:3001/drug-conditions');
    return response.data;
};