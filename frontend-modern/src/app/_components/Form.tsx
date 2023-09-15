"use client";
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function isSubmit(param: { searchParams: { [p: string]: File | string } }) {
    return false;
}
async function fetchDrugConditions(drugId: string) {

    const res = await fetch(
//        `http://127.0.0.1/api/incidence/v2/drug-conditions/${drugId}`, {
        ` http://localhost:3001/drug-conditions`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    return await res.json();
}

export const Form = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.currentTarget;
        const drug = target.elements.namedItem("drug") as HTMLInputElement;
        const condition = target.elements.namedItem("condition") as HTMLInputElement;

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


        } catch(err) {
            console.log("Error fetching drug conditions")
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <h2 className="form-label  mb-2">How often do patients get a condition after starting a drug?</h2>
            <input id='drug' type="text" name="drug"
                   className="form-input mb-4"
                   placeholder="Enter generic drug name"
                   required minLength={5} maxLength={50}/>
            <h2 className="form-label">Which condition are you interested in?</h2>
            <input id='condition' type="text" name="condition"
                   className="form-input"
                   placeholder="Leave blank for conditions on product"
            />
            <div>
                <button type="submit" className="form-button-primary  mr-4">Go</button>
                <button className="form-button-secondary"> Clear</button>
            </div>
        </form>

    );
}