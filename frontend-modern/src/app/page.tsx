import Image from "next/image";
import { Button } from '@mui/base/Button';
import { useButton } from '@mui/base/useButton';
import Head from "next/head";
import { redirect } from "next/navigation"
import {Form} from "@/app/_components/Form";

export default function Home() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Image
                src="/pill.png"
                width={60} height={60}
                alt="Picture of the pill"
            /><Image
            src="/graph.png"
            width={60}
            height={0}
            alt="Picture of the grpah"
        />
            <h1>How Often...</h1>

            <Form/>

            <section>
                <h2>What this does</h2>
                <p>Use this tool to look up the proportion of people taking a drug who are newly diagnosed with a
                    condition within 1 year of starting the drug. You can search for a specific drug-condition incidence
                    by entering your drug and condition of interest in the fields above. Or, you can browse a list of
                    conditions of potential interest by leaving the condition field blank, and you'll be shown
                    conditions listed on the drug's product label.</p>
            </section>

            <section>
                <h2>What this does not do</h2>
                <p>This tool does not demonstrate that a drug causes a condition (i.e., that the condition is a side
                    effect of the drug). Instead, for example, the condition may be part of the reason you are taking
                    the drug, or the condition may just be common in the population.</p>
            </section>

            <section>
                This tool provides the overall observed risk in a population, but does not provide the attributable risk
                due to drug exposure. The results provided are raw unadjusted numbers for each diagnosis. The data made
                available through this site are for informational purposes only and are not a substitute for
                professional medical advice or services. You should not use this information for comparing drugs or
                making decisions related to diagnosing or treating a medical or health condition; instead, please
                consult a physician or healthcare professional in all matters related to your health.
            </section>
        </main>
    )
}
function isSubmit(props: { searchParams: {}; }) {
    return Object.keys(props.searchParams).includes('drug')
}

async function save(data) {
    return Promise.resolve('Imagine database persistence')
}

function Toast() {
    return <div>Imagine a thing that temporarily shows a message</div>
}