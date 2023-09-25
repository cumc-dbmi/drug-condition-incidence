import Image from 'next/image';
import { DrugConditionSearchForm } from '@/app/_components/DrugConditionSearchForm';
import React from 'react';
import { Card } from '@nextui-org/card';
import { PageWrapper } from './_components/page.wrapper';

export default function Home() {
  return (
    <main className='flex flex-col items-center gap-8 pt-8'>
      <PageWrapper>
        <Card className='max-w-screen-xl'>
          <div className='flex flex-col items-center gap-4 p-12'>
            <section className='flex flex-col items-center gap-4 p-12'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/pill.png'
                  width={100}
                  height={100}
                  alt='Picture of the pill'
                />
                <Image
                  src='/graph.png'
                  width={100}
                  height={100}
                  alt='Picture of the grpah'
                />
              </div>

              <div className='flex flex-col gap-4'>
                <h1 className='text-center text-4xl'>How Often...</h1>
                <h2 className='text-center text-3xl'>
                  How often do patients get a condition after starting a drug?
                </h2>
              </div>
            </section>

            <DrugConditionSearchForm />

            <section className='grid grid-cols-2 gap-6 pt-8 '>
              <div>
                <h2 className='pb-4 text-3xl'>What this does</h2>
                <p className='text-medium'>
                  Use this tool to look up the proportion of people taking a
                  drug who are newly diagnosed with a condition within 1 year of
                  starting the drug. You can search for a specific
                  drug-condition incidence by entering your drug and condition
                  of interest in the fields above. Or, you can browse a list of
                  conditions of potential interest by leaving the condition
                  field blank, and you&apos;ll be shown conditions listed on the
                  drug&apos;s product label.
                </p>
              </div>

              <div>
                <h2 className='pb-4 text-3xl'>What this does not do</h2>
                <p className='text-medium'>
                  This tool does not demonstrate that a drug causes a condition
                  (i.e., that the condition is a side effect of the drug).
                  Instead, for example, the condition may be part of the reason
                  you are taking the drug, or the condition may just be common
                  in the population.
                </p>
              </div>
            </section>
          </div>
          <div className='flex flex-col items-center'>
            <section className='m-6 bg-primary-100 p-6'>
              <p className='text-sm'>
                This tool provides the overall observed risk in a population,
                but does not provide the attributable risk due to drug exposure.
                The results provided are raw unadjusted numbers for each
                diagnosis. The data made available through this site are for
                informational purposes only and are not a substitute for
                professional medical advice or services. You should not use this
                information for comparing drugs or making decisions related to
                diagnosing or treating a medical or health condition; instead,
                please consult a physician or healthcare professional in all
                matters related to your health.
              </p>
            </section>
          </div>
        </Card>
      </PageWrapper>
    </main>
  );
}
