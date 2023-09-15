async function fetchDrugs(): Promise<Drug[]> {
    console.log("fetchDrugs");
    const res = await fetch(
        'http://localhost:3001/drugs',
);
    console.log("fetchDrugs");
    return res.json();
}

function findDrugId(drugs: Drug[], drugName: string): number {
    const val =  drugs.find(drug => drug.drugConceptName === drugName)?.drugConceptId;
    if (val === undefined) {
        throw new Error(`Drug ${drugName} not found`);
    }
    return val;
}

async function fetchDrugConditions(drugId: number , signal: RequestInit | undefined): Promise<DrugCondition[]> {
    const res = await fetch(
        `http://localhost:3001/drug-conditions`, signal);
    return res.json();
}