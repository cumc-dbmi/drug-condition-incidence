import React from "react";
import {DrugConditionDetailsTable} from "@/app/_components/DrugConditionDetailsTable";
import {DrugConditionDetailsStackedBarChart} from "@/app/_components/DrugConditionDetailsStackedBarChart";
import {Card} from "@nextui-org/card";

export default function SideEffects() {

    return (
        <main className="flex flex-col items-center pt-8 gap-8">
            <Card className="w-full max-w-screen-xl p-16 text-center">
                <h1>Risk of cardiac arrhythmia with Hydrochlorothiazide</h1>
                <p>Amongst patients taking Hydrochlorothiazide, onset of cardiac arrhythmia occurs in % to % of patients
                    during the 1 year after starting the drug</p>
                <DrugConditionDetailsStackedBarChart/>
            </Card>
            <DrugConditionDetailsTable className="w-full max-w-screen-xl p-16"/>
        </main>
    )
}
