'use client';

import React from 'react';
import {
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { AsyncListData } from '@react-stately/data';

interface DrugConditionsTableProps {
  className: string;
  drug: Drug;
  isLoading: boolean;
  asyncDataList: AsyncListData<DrugCondition>;
}

export const DrugConditionsTable = ({
  className,
  drug,
  isLoading,
  asyncDataList,
}: DrugConditionsTableProps) => {
  const router = useRouter();
  console.log('Render DrugConditionsTable');

  return (
    <Table
      isStriped
      aria-label='List of drug conditions.'
      sortDescriptor={asyncDataList.sortDescriptor}
      onSortChange={asyncDataList.sort}
      className='w-full'
      selectionMode='single'
      onRowAction={(key) => router.push(`/${drug.drug_concept_id}/${key}`)}
    >
      <TableHeader>
        <TableColumn allowsSorting align={'start'} key='outcome_concept_name'>
          {' '}
          Condition{' '}
        </TableColumn>
        <TableColumn
          allowsSorting
          align={'end'}
          key='incidence_proportion_range_low'
        >
          {' '}
          Lowest Incidence (%){' '}
        </TableColumn>
        <TableColumn
          allowsSorting
          align={'end'}
          key='incidence_proportion_range_high'
        >
          {' '}
          Highest Incidence (%){' '}
        </TableColumn>
      </TableHeader>
      <TableBody
        items={asyncDataList.items}
        isLoading={isLoading}
        loadingContent={<Spinner label='Loading...' />}
      >
        {(item) => (
          <TableRow key={item.outcome_concept_id}>
            {(columnKey) => (
              <TableCell>
                {isNaN(getKeyValue(item, columnKey))
                  ? getKeyValue(item, columnKey)
                  : getKeyValue(item, columnKey) == 0
                  ? '~0.0'
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
