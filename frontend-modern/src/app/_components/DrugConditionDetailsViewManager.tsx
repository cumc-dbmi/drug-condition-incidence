'use client';

import { notFound } from 'next/navigation';
import { Card } from '@nextui-org/card';
import React, {useEffect, useState} from 'react';
import { DrugConditionDetailsStackedBarChart } from '@/app/_components/DrugConditionDetailsStackedBarChart';
import { DrugConditionDetailsTable } from '@/app/_components/DrugConditionDetailsTable';
import { useAsyncList } from '@react-stately/data';
import { fetchDrugConditionDetailList} from '@/app/_services/services';
import { Breadcrumb, Breadcrumbs, Link } from 'react-aria-components';
import BreadcrumbsClasses from '@/app/_components/Breadcrumbs.module.css';

type DrugConditionDetailWrapper = {
  rates: any[];
  sources: DrugConditionDetail[];
};

interface DrugConditionDetailsViewManagerProps {
  drugConceptId: number;
  outcomeConceptId: number;
}
export const DrugConditionDetailsViewManager = ({
  drugConceptId,
  outcomeConceptId,
}: DrugConditionDetailsViewManagerProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drug, setDrug] = useState<Drug>({
    drug_concept_id: drugConceptId,
    drug_concept_name: '',
  });
  const [lowerBoundRate, setLowerBoundRate] = useState<number>(0);
  const [upperBoundRate, setUpperBoundRate] = useState<number>(0);

  let list = useAsyncList<DrugConditionDetail>({
    async load({ signal }) {
      let json = await fetchDrugConditionDetailList(
        drugConceptId,
        outcomeConceptId
      )
        .then((data) => {
          setIsLoading(false);
          setIsValid(true);
          return data;
        })
        .catch((error) => {
          setIsLoading(false);
          setIsValid(false);
          return [];
        });
      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const columnA: any = sortDescriptor.column;
          const columnB: any = sortDescriptor.column;
          // @ts-ignore
          let first = a[columnA];
          // @ts-ignore
          let second = b[columnB];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const lowerBoundRate = 0;
      setLowerBoundRate(lowerBoundRate);
      const upperBoundRate = 0;
      setUpperBoundRate(upperBoundRate);
    }
  }, [isLoading, list.items]);

  if (!isLoading && !isValid) {
    return notFound();
  } else
    return (
      <>
        <Card className='w-full max-w-screen-xl p-16 text-center'>
          <h1>Risk of cardiac arrhythmia with {drug.drug_concept_name}</h1>
          <p>
            Amongst patients taking {drug.drug_concept_name}, onset of cardiac
            arrhythmia occurs in {lowerBoundRate}% to {upperBoundRate}% of
            patients during the 1 year after starting the drug
          </p>
          <DrugConditionDetailsStackedBarChart isLoading={isLoading} />
        </Card>
        <Card className='w-full max-w-screen-xl p-16 '>
          <Breadcrumbs className={BreadcrumbsClasses.Breadcrumbs}>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link}>
                <a href='/'>Home</a>
              </Link>
            </Breadcrumb>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link}>
                <a href='/974166'>Hydrochlorothiazide Drug Conditions</a>
              </Link>
            </Breadcrumb>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link}>
                Cardiac arrhythmia Rates & Sources
              </Link>
            </Breadcrumb>
          </Breadcrumbs>
          <DrugConditionDetailsTable
            isLoading={isLoading}
            asyncDataList={list}
            className='w-full max-w-screen-xl p-16'
          />
        </Card>
      </>
    );
};
