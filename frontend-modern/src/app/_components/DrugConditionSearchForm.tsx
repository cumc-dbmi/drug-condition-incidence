"use client";
import React, {useState} from 'react'
import {useRouter} from 'next/navigation';
import {Button} from "@nextui-org/button";
import {Autosuggest} from "@/app/_components/Autosuggest";
import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";
import {useQuery} from "react-query";
import {getDrugConditionAsListBoxItems, getDrugListAsListBoxItems} from "@/app/_services/services";


export const DrugConditionSearchForm = () => {
    const router = useRouter();
    const [isFormValid, setFormValid] = useState(false);
    const {data: drugListData=[]} = useQuery<AutosuggestListboxItem[]>("drugs", getDrugListAsListBoxItems);
    const [selectedDrug, setSelectedDrug] = useState<AutosuggestListboxItem>({label: "", value: 0});
    const { isIdle, data: drugConditionListData=[]} = useQuery<AutosuggestListboxItem[]>(["drugsConditions", selectedDrug.value], getDrugConditionAsListBoxItems, {enabled: selectedDrug.value > 0});
    const [selectedCondition, setSelectedCondition] = useState<AutosuggestListboxItem>({label: "", value: 0});

    async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            console.log(selectedDrug + " " + selectedCondition);
            if (selectedDrug.value > 0 && selectedCondition.value > 0)
                router.push(`/${selectedDrug.value}/${selectedCondition.value}`);
            else if (selectedDrug.value > 0)
                router.push(`/${selectedDrug.value}`);
        } catch (err) {
            console.log("Error fetching drug conditions")
        }
    }

    return (
        <form onSubmit={handleOnSubmit}
              className="flex w-full flex-col items-center md:flex-nowrap gap-4 max-w-screen-md">

            <h3 className="text-2xl">Which drug are you interested in?</h3>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Autosuggest data={drugListData}
                             onSelectHandler={(e) => {
                                 setSelectedDrug(e);
                                 setFormValid(true);
                             }}
                             isRequired={true}
                             isDisabled={false}
                             isClearable={true}
                             id="drugName"
                             size="lg"
                             variant="bordered"
                             label="Enter generic drug name"
                />
            </div>

            <h3 className="text-2xl">Which condition are you interested in?</h3>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Autosuggest data={drugConditionListData}
                             onSelectHandler={(e) => {
                                 setSelectedCondition(e);
                             }}
                             isRequired={false}
                             isDisabled={!isFormValid}
                             isClearable
                             id="conditionName"
                             size="lg"
                             variant="bordered"
                             label="Enter condition name"
                />
            </div>

            <div>
                <Button type="submit"
                        size="lg" color="primary">Search</Button>
            </div>

        </form>

    );
}