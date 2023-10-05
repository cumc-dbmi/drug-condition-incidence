'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';
import { DrugConditionDetailsStackedBarChart } from '@/app/_components/DrugConditionDetailsStackedBarChart';
import { DrugConditionDetailsTable } from '@/app/_components/DrugConditionDetailsTable';
import { Card } from '@nextui-org/card';
import {
  fetchDrugById,
  fetchDrugConditionByDrugIdAndOutcomeConceptId,
  fetchDrugConditionDetailList,
} from '@/app/_services/services';
import { notFound } from 'next/navigation';
import { useAsyncList } from '@react-stately/data';

import BreadcrumbsClasses from '@/app/_components/Breadcrumbs.module.css';

interface DrugConditionDetailsViewManagerProps {
  drugConceptId: number;
  outcomeConceptId: number;
}

function getSortedRateSources(itemsOrig: DrugConditionDetail[]) {
  const items = [...itemsOrig];
  return items.sort((a, b) =>
    a.incidence_rate < b.incidence_rate
      ? 1
      : a.incidence_rate > b.incidence_rate
      ? -1
      : 0
  );
}

interface DrugConditionDetail {
  source_short_name: string;
  source_country: string;
  incidence_proportion: number;
  incidence_rate: number;
  num_persons_at_risk: number;
  requires_full_time_at_risk: string;
}
interface TimeAtRiskSummary {
  NO: number;
  YES: number;
}

interface DrugConditionDetailsGroupedByCountryAndTimeAtRisk {
  source_country: string;
  requires_full_time_at_risk: TimeAtRiskSummary;
}
function groupByCountryAndRisk(
  arr: DrugConditionDetail[]
): DrugConditionDetailsGroupedByCountryAndTimeAtRisk[] {
  const result: Record<string, TimeAtRiskSummary> = arr.reduce((acc, item) => {
    // @ts-ignore
    if (!acc[item.source_country]) {
      // @ts-ignore
      acc[item.source_country] = {
        NO: 0,
        YES: 0,
      };
    }

    // @ts-ignore
    acc[item.source_country][item.requires_full_time_at_risk.toUpperCase()] +=
      item.num_persons_at_risk;

    return acc;
  }, {});

  return Object.entries(result).map(([country, riskData]) => ({
    source_country: country,
    requires_full_time_at_risk: riskData as TimeAtRiskSummary,
  }));
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
  const [drugCondition, setDrugCondition] = useState<DrugCondition>({
    outcome_concept_id: outcomeConceptId,
    outcome_concept_name: '',
    incidence_proportion_range_low: 0,
    incidence_proportion_range_high: 0,
  });

  const [lowerBoundRate, setLowerBoundRate] = useState<number>(0);
  const [upperBoundRate, setUpperBoundRate] = useState<number>(0);
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [chartDataGroup1, setChartDataGroup1] = useState<number[]>([]);
  const [chartDataGroup2, setChartDataGroup2] = useState<number[]>([]);
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
    fetchDrugById(drugConceptId)
      .then((data) => {
        setDrug(data);
      })
      .catch((error) => {
        console.error(`Error occurred fetching drug for: ${drugConceptId}`);
      });
    fetchDrugConditionByDrugIdAndOutcomeConceptId(
      drugConceptId,
      outcomeConceptId
    )
      .then((data) => {
        setDrugCondition(data);
      })
      .catch((error) => {
        console.error(
          `Error occurred fetching drug condition for: ${outcomeConceptId}`
        );
      });
  }, [drugConceptId, outcomeConceptId]);

  useEffect(() => {
    if (!isLoading) {
      const sortedItems = getSortedRateSources(list.items);
      const lowerBoundRate = sortedItems[sortedItems.length - 1].incidence_rate;
      setLowerBoundRate(lowerBoundRate);
      const upperBoundRate = sortedItems[0].incidence_rate;
      setUpperBoundRate(upperBoundRate);
      const groupedByCountryAndRisk = groupByCountryAndRisk(sortedItems);
      const countries = groupedByCountryAndRisk.map(
        (item) => item.source_country
      );
      setChartCategories(countries);
      const timeAtRiskNO = groupedByCountryAndRisk.map(
        (item) => item.requires_full_time_at_risk.NO
      );
      setChartDataGroup1(timeAtRiskNO);
      const timeAtRiskYES = groupedByCountryAndRisk.map(
        (item) => item.requires_full_time_at_risk.YES
      );
      setChartDataGroup2(timeAtRiskYES);
    }
  }, [isLoading, list.items]);

  if (!isLoading && !isValid) {
    return notFound();
  } else
    return (
      <>
        <Card className='w-full max-w-screen-xl p-16 text-center'>
          <h1>Risk of cardiac arrhythmia with {drug.drug_concept_name}</h1>
          <p className='m-auto max-w-screen-md'>
            Amongst patients taking {drug.drug_concept_name}, onset of cardiac
            arrhythmia occurs in {lowerBoundRate}% to {upperBoundRate}% of
            patients during the 1 year after starting the drug
          </p>
          <DrugConditionDetailsStackedBarChart
            className={'pt-8'}
            isLoading={isLoading}
            drug={drug}
            drugCondition={drugCondition}
            chartCategories={chartCategories}
            chartDataGroup1={chartDataGroup1}
            chartDataGroup2={chartDataGroup2}
          />
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
                <a href={'/' + drug.drug_concept_id}>
                  {drug.drug_concept_name + ' Drug Conditions'}
                </a>
              </Link>
            </Breadcrumb>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
              <Link className={BreadcrumbsClasses.Link}>
                {drugCondition.outcome_concept_name + ' Sources and Rates'}
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
