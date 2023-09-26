import { AutosuggestListboxItem } from '@/app/_components/Autosuggestion.interface';
import axios from 'axios';
import { QueryFunctionContext, QueryKey } from 'react-query';

let apiHostname: string | undefined = 'https://laptop-api.edwincruz.com';

export function setEnvironmentVariables(
  apiHostnameFromConfig: string | undefined
) {
  console.log('apiHostnameFromConfig: ' + apiHostnameFromConfig);
  apiHostname = apiHostnameFromConfig;
}

async function fetchDrugs(): Promise<Drug[]> {
  console.log('fetchDrugs');
  const res = await fetch(`${apiHostname}/drugs`);
  console.log('fetchDrugs');
  return res.json();
}

async function fetchDrugConditionsById(
  drugId: number,
  signal: RequestInit | undefined
): Promise<DrugCondition[]> {
  const res = await fetch(`${apiHostname}/drug-conditions`, signal);
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
  console.log('fetchDrugList:' + apiHostname);
  const response = await axios.get(`${apiHostname}/drugs`);
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
  const response = await axios.get(`${apiHostname}/drug-conditions`);
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
  const response = await axios.get(`${apiHostname}/drug-condition-details`);
  return response.data;
};
