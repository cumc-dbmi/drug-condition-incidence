import { AutosuggestListboxItem } from '@/app/_components/Autosuggestion.interface';
import axios from 'axios';
import { QueryFunctionContext, QueryKey } from 'react-query';

const backApiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

async function fetchDrugs(): Promise<Drug[]> {
  const url = `${backApiBaseUrl}/drugs`;
  console.log(`fetchDrugs: ${url}`);
  const res = await fetch(`${url}`);
  return res.json();
}

async function fetchDrugConditionsById(
  drugId: number,
  signal: RequestInit | undefined
): Promise<DrugCondition[]> {
  const url = `${backApiBaseUrl}/drug-conditions/${drugId}`;
  console.log(`fetchDrugConditionsById: ${url}`);
  const res = await fetch(`${url}`, signal);
  return res.json();
}

export const getDrugListAsListBoxItems = async (): Promise<
  AutosuggestListboxItem[]
> => {
  const input: Drug[] = await fetchDrugList();
  return input.map((item) => ({
    label: item.drug_concept_name,
    value: item.drug_concept_id,
  }));
};

export const fetchDrugById = async (drugConceptId: number): Promise<Drug> => {
  const url = `${backApiBaseUrl}/drugs/${drugConceptId}`;
  console.log(`fetchDrugById: ${url}`);
  const response = await axios.get(`${url}`);
  return response.data;
};

export const fetchDrugConditionByDrugIdAndOutcomeConceptId = async (
  drugConceptId: number,
  outcomeConceptId: number
): Promise<DrugCondition> => {
  const url = `${backApiBaseUrl}/drug-conditions/${drugConceptId}`;
  console.log(`fetchDrugConditionList: ${url}`);
  const response = await axios
    .get(`${url}`)
    .then((response): Promise<DrugCondition> => {
      return response.data.filter(
        (item: DrugCondition) => item.outcome_concept_id === outcomeConceptId
      )[0];
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return response;
};

export const fetchDrugList = async (): Promise<Drug[]> => {
  const url = `${backApiBaseUrl}/drugs`;
  console.log(`fetchDrugList: ${url}`);
  const response = await axios.get(`${url}`);
  return response.data;
};

export async function getDrugConditionAsListBoxItems(
  context: QueryFunctionContext<QueryKey>
): Promise<AutosuggestListboxItem[]> {
  const [type, drugConceptId] = context.queryKey;
  if (type !== 'drugsConditions' || typeof drugConceptId !== 'number') {
    throw new Error('Invalid query key');
  }
  const input: DrugCondition[] = await fetchDrugConditionList(drugConceptId);
  return input.map((item) => ({
    label: item.outcome_concept_name,
    value: item.outcome_concept_id,
  }));
}

export const fetchDrugConditionList = async (
  drugConceptId: number
): Promise<DrugCondition[]> => {
  const url = `${backApiBaseUrl}/drug-conditions/${drugConceptId}`;
  console.log(`fetchDrugConditionList: ${url}`);
  const response = await axios.get(`${url}`).catch((error) => {
    console.log(error);
    throw error;
  });
  return response.data;
};

export const fetchDrugConditionDetailList = async (
  drugConceptId: number,
  outcomeConceptId: number
) => {
  const url = `${backApiBaseUrl}/exposure-outcomes/${drugConceptId}/rates-and-sources/${outcomeConceptId}/365`;
  console.log(`fetchDrugConditionDetailList: ${url}`);
  const response = await axios.get(`${url}`);
  return response.data;
};
