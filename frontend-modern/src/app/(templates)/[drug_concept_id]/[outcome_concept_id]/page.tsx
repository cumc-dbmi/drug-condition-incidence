import React from 'react';
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/app/_components/page.wrapper';
import { DrugConditionDetailsViewManager } from '@/app/_components/DrugConditionDetailsViewManager';

export default async function Page({
  params,
}: {
  params: { drug_concept_id: number; outcome_concept_id: number };
}) {
  const drugConceptId = Number(params.drug_concept_id);
  const outcomeConceptId = Number(params.outcome_concept_id);

  if (isNaN(drugConceptId) || isNaN(outcomeConceptId)) {
    return notFound();
  } else
    return (
      <PageWrapper>
        <main className='flex flex-col items-center gap-8 pt-8'>
          <DrugConditionDetailsViewManager
            drugConceptId={drugConceptId}
            outcomeConceptId={outcomeConceptId}
          />
        </main>
      </PageWrapper>
    );
}
