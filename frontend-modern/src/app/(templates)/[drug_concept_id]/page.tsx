import React from "react";
import {DrugConditionsTable} from "@/app/_components/DrugConditionsTable";
import {DrugConditionsChart} from "@/app/_components/DrugConditionsChart";
import {Card} from "@nextui-org/card";
import {fetchDrugConditionList} from "@/app/_services/services";
import {notFound} from "next/navigation";
import {PageWrapper} from "@/app/_components/page.wrapper";


export default async function Page({params}: { params: { drug_concept_id: number } }) {
    console.log("Attempt tp load page for drug_concept_id: " + params.drug_concept_id);
    const drugConceptId = Number(params.drug_concept_id);
    if (isNaN(drugConceptId))
        return notFound();
    const data: Promise<DrugCondition[]> = fetchDrugConditionList(drugConceptId)
        .catch((error) => {
            console.error("Error occurred fetching drug condition list for: " + drugConceptId);
            console.error(error);
        });

    return (
        <PageWrapper>
            <main className="flex flex-col items-center pt-8 gap-8">
                <Card className="w-full max-w-screen-xl p-16 text-center">
                    <h1>{"Hydrochlorothiazide"} Condition List from Product Label</h1>
                    <p>Amongst patients taking Hydrochlorothiazide, onset of the following conditions occurs during the
                        1
                        year after starting the drug</p>
                    <DrugConditionsChart data={data}/>
                </Card>
                <Card className="w-full max-w-screen-xl p-16">
                <DrugConditionsTable id={drugConceptId} data={data} className="w-full max-w-screen-xl p-16"/>
                </Card>
            </main>
        </PageWrapper>
    )
}