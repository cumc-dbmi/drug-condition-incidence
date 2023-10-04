'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@nextui-org/card';
import { DrugConditionsChart } from '@/app/_components/DrugConditionsChart';
import { DrugConditionsTable } from '@/app/_components/DrugConditionsTable';
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';
import BreadcrumbsClasses from './Breadcrumbs.module.css';
import {
  fetchDrugById,
  fetchDrugConditionList,
} from '@/app/_services/services';
import { notFound } from 'next/navigation';
import { useAsyncList } from '@react-stately/data';

interface DrugConditionsViewManagerProps {
  drugConceptId: number;
}

export const DrugConditionsViewManager = ({
  drugConceptId,
}: DrugConditionsViewManagerProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drug, setDrug] = useState<Drug>({
    drug_concept_id: drugConceptId,
    drug_concept_name: '',
  });
  const [conditionList, setConditionList] = useState<DrugCondition[]>([]);

  useEffect(() => {
    fetchDrugById(drugConceptId)
      .then((data) => {
        setDrug(data);
      })
      .catch((error) => {
        console.error(`Error occurred fetching drug for: ${drugConceptId}`);
      });
  }, [drugConceptId]);

  let list = useAsyncList<DrugCondition>({
    async load({ signal }) {
      let json = await fetchDrugConditionList(drugConceptId)
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

  if (!isLoading && !isValid) {
    return notFound();
  } else
    return (
      <>
        <Card className='w-full max-w-screen-xl p-16 text-center'>
          <div>
            <h1>{drug.drug_concept_name} Condition List from Product Label</h1>
            <p>
              Amongst patients taking {drug.drug_concept_name}, onset of the
              conditions occurs during the 1 year after starting the drug
            </p>
            <DrugConditionsChart drug={drug} data={conditionList} />
          </div>
        </Card>
        <Card className='w-full max-w-screen-xl p-16'>
          <Breadcrumbs className={BreadcrumbsClasses.Breadcrumbs}>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link}>
                <a href='/'>Home</a>
              </Link>
            </Breadcrumb>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link} >
                {drug.drug_concept_name + ' Drug Conditions'}
              </Link>
            </Breadcrumb>
          </Breadcrumbs>
          <DrugConditionsTable
            isLoading={isLoading}
            drug={drug}
            asyncDataList={list}
            className='w-full max-w-screen-xl p-16'
          />
        </Card>
      </>
    );
};
