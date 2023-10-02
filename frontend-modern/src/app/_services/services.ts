import { AutosuggestListboxItem } from '@/app/_components/Autosuggestion.interface';
import axios from 'axios';
import { QueryFunctionContext, QueryKey } from 'react-query';

const backApiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

async function fetchDrugs(): Promise<Drug[]> {
  console.log(`fetchDrugs: ${backApiBaseUrl}/drugs`);
  const res = await fetch(`${backApiBaseUrl}/drugs`);
  console.log('fetchDrugs');
  return res.json();
}

async function fetchDrugConditionsById(
  drugId: number,
  signal: RequestInit | undefined
): Promise<DrugCondition[]> {
  const res = await fetch(`${backApiBaseUrl}/drug-conditions`, signal);
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
export const fetchDrugList = async (): Promise<Drug[]> => {
  const response = await axios.get(`${backApiBaseUrl}/drugs`);
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

export const fetchDrugConditionList = async (drugConceptId: number) => {
  console.log('fetchDrugConditionList using drug concept id: ' + drugConceptId);
  const response = await axios.get(
    `${backApiBaseUrl}/drug-conditions/${drugConceptId}`
  );
  console.log(`${process.env.NEXT_PUBLIC_TEST}`);
  return response.data;
};

export const fetchDrugConditionDetailList = async (
  drugConceptId: number,
  outcomeConceptId: number
) => {
  console.log(
    'fetchDrugConditionDetailList using drug concept id: ' +
      drugConceptId +
      ' and outcome concept id: ' +
      outcomeConceptId
  );
  const response = await axios.get(
    `${backApiBaseUrl}/exposure-outcomes/${drugConceptId}/rates-and-sources/${outcomeConceptId}/365`
  );
  return response.data;
};
