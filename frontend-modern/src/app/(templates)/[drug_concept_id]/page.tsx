import React from 'react';
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/app/_components/page.wrapper';
import { DrugConditionsViewManager } from '@/app/_components/DrugConditionsViewManager';

export default async function Page({
  params,
}: {
  params: { drug_concept_id: number };
}) {
  const drugConceptId = Number(params.drug_concept_id);

  if (isNaN(drugConceptId)) {
    return notFound();
  } else
    return (
      <PageWrapper>
        <main className='flex flex-col items-center gap-8 pt-8'>
          <DrugConditionsViewManager drugConceptId={drugConceptId} />
        </main>
      </PageWrapper>
    );
}
