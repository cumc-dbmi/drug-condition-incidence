import React from "react";
import {DrugConditionDetailsTable} from "@/app/_components/DrugConditionDetailsTable";
import {DrugConditionDetailsStackedBarChart} from "@/app/_components/DrugConditionDetailsStackedBarChart";

export default function SideEffects() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Risk of cardiac arrhythmia with Hydrochlorothiazide</h1>
            <p>Amongst patients taking Hydrochlorothiazide, onset of cardiac arrhythmia occurs in % to % of patients during the 1 year after starting the drug</p>
            <DrugConditionDetailsStackedBarChart/>
            <DrugConditionDetailsTable/>
        </main>
    )
}
