"use client";
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation';
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/react";
import axios from "axios";
import {Autosuggest} from "@/app/_components/Autosuggest";
import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";

async function fetchDrugConditions(drugId: string) {

    const res = await fetch(
//        `http://127.0.0.1/api/incidence/v2/drug-conditions/${drugId}`, {
        `http://localhost:3001/drug-conditions`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    return await res.json();
}

function convertToAutosuggestListboxItems(input: Drug[]): AutosuggestListboxItem[] {
    return input.map(item => ({
        label: `${item.drug_concept_name}`,
        value: item.drug_concept_id
    }));
}

export const DrugConditionSearchForm = () => {
    const [data, setData] = useState<AutosuggestListboxItem[]>([])
    useEffect(() => {
        axios.get(`http://localhost:3001/drugs`).then(resp => setData(convertToAutosuggestListboxItems(resp.data)))
    }, [])


    const router = useRouter();

    const [drugName, setDrugName] = useState("");
    const [isDrugNameValid, setDrugNameValid] = useState(false);

    const [isValid, setValid] = useState(false);


    async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.currentTarget;
        const drug = target.elements.namedItem("drugName") as HTMLInputElement;
        const condition = target.elements.namedItem("conditionName") as HTMLInputElement;

        const data = {
            drug: drug.value.toLowerCase(),
            condition: condition?.value.toLowerCase()
        }
        try {
            // const res = await fetchDrugConditions(data.drug)
            // if (!res.ok)
            //     throw new Error(res.statusText)
            // console.log(res)

            router.push(`/${data.drug}`);


        } catch (err) {
            console.log("Error fetching drug conditions")
        }
    }

    const validateDrugName = () => {
        return drugName.length > 0;
    };
    useEffect(() => {
        console.log("useEffect called for validateDrugName()")
        const isDrugNameValid = validateDrugName();
        setDrugNameValid(isDrugNameValid);
    }, [drugName]);


    return (
        <form onSubmit={handleOnSubmit}
              className="flex w-full flex-col items-center md:flex-nowrap gap-4 max-w-screen-md">


            <h3 className="text-2xl">Which drug are you interested in?</h3>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Autosuggest data={data}
                             // id="drugName"
                             // name="drugName"
                             // label="Enter generic drup name"
                             // value={drugName}
                             // onChange={(e) => setDrugName(e.target.value)}
                />
                {/*<Input isRequired isClearable*/}
                {/*       id="drugName" type="text" name="drugName"*/}
                {/*       size="lg" variant="bordered" className="md:rt-r-w-max-content"*/}
                {/*       label="Enter generic drup name"*/}
                {/*       value={drugName}*/}
                {/*       onChange={(e) => setDrugName(e.target.value)}/>*/}
            </div>


            <h3 className="text-2xl">Which condition are you interested in?</h3>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input isDisabled={!isDrugNameValid} isClearable
                       id="conditionName" type="text" name="conditionName"
                       size="lg" variant="bordered" className="md:rt-r-w-max-content"
                       label="Enter condition name"/>
            </div>


            <div>
                <Button type="submit"
                        size="lg" color="primary">Search</Button>
            </div>


        </form>

    );
}