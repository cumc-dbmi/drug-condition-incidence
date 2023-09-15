
import React from "react";
import DrugConditionsTable from "@/app/_components/DrugConditionsTable";
import DrugConditionsChart from "@/app/_components/DrugConditionsChart";



async function fetchDrugConditions(drugId: string) {

}

export default async function DrugsConditions() {



    // This will be logged on the server during the initial render
    // and on the client on subsequent navigations.
    // const drugId = await fetchDrugListAndFindDrugId(drugName);
    // const conditions = await fetchDrugConditions(drugId);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>{"Hydrochlorothiazide"} Condition List from Product Label</h1>
            <p>Amongst patients taking Hydrochlorothiazide, onset of the following conditions occurs during the 1 year after starting the drug</p>
            <DrugConditionsChart/>
            <DrugConditionsTable/>
        </main>
    )
}