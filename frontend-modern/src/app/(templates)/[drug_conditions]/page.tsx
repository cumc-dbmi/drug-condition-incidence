import React from "react";
import {DrugConditionsTable} from "@/app/_components/DrugConditionsTable";
import {DrugConditionsChart} from "@/app/_components/DrugConditionsChart";
import {Card} from "@nextui-org/card";


async function fetchDrugConditions(drugId: string) {

}

export default async function DrugsConditions() {

    return (
        <main className="flex flex-col items-center pt-8 gap-8">
            <Card className="w-full max-w-screen-xl p-16 text-center">
                <h1>{"Hydrochlorothiazide"} Condition List from Product Label</h1>
                <p>Amongst patients taking Hydrochlorothiazide, onset of the following conditions occurs during the 1
                    year after starting the drug</p>
                <DrugConditionsChart/>
            </Card>
            <DrugConditionsTable className="w-full max-w-screen-xl p-16"/>
        </main>
    )
}