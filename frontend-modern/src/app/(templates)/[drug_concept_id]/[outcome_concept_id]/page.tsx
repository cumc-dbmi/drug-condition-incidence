import React from "react";
import {DrugConditionDetailsTable} from "@/app/_components/DrugConditionDetailsTable";
import {DrugConditionDetailsStackedBarChart} from "@/app/_components/DrugConditionDetailsStackedBarChart";
import {Card} from "@nextui-org/card";
import {notFound} from "next/navigation";
import {fetchDrugConditionDetailList} from "@/app/_services/services";
import {PageWrapper} from "@/app/_components/page.wrapper";

type DrugConditionDetailWrapper = {
    rates: any[]
    sources: DrugConditionDetail[]
}


export default async function Page({params}: { params: { drug_concept_id: number, outcome_concept_id: number } }) {
    console.log("Attempt tp load page for drug_concept_id: " + params.drug_concept_id);
    const drugConceptId = Number(params.drug_concept_id);
    const outcomeConceptId = Number(params.outcome_concept_id);
    if (isNaN(outcomeConceptId))
        return notFound();
    const data: Promise<DrugConditionDetailWrapper> = fetchDrugConditionDetailList(drugConceptId, outcomeConceptId)
        .catch((error) => {
            console.error("Error occurred fetching drug condition detail list for: " + drugConceptId);
            console.error(error);
        });
    let drugConditionRateList: Promise<any[]> = data.then((v) => v.rates);
    let drugConceptDetailList: Promise<DrugConditionDetail[]> = data.then((v) => v.sources);


    console.log("load page for: outcome_concept_id:" + params.outcome_concept_id);
    return (
        <PageWrapper>
            <main className="flex flex-col items-center pt-8 gap-8">
                <Card className="w-full max-w-screen-xl p-16 text-center">
                    <h1>Risk of cardiac arrhythmia with Hydrochlorothiazide</h1>
                    <p>Amongst patients taking Hydrochlorothiazide, onset of cardiac arrhythmia occurs in % to % of
                        patients
                        during the 1 year after starting the drug</p>
                    <DrugConditionDetailsStackedBarChart data={data.then((v) => v.sources)}/>
                </Card>
                <Card className="w-full max-w-screen-xl p-16 text-center">
                <DrugConditionDetailsTable id={drugConceptId} data={drugConceptDetailList}
                                           className="w-full max-w-screen-xl p-16"/>
                </Card>
            </main>
        </PageWrapper>
    )
}
