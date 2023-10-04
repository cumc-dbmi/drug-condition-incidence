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
import { AsyncListData } from '@react-stately/data';

interface DrugConditionDetailsTableProps {
  className: string;
  isLoading: boolean;
  asyncDataList: AsyncListData<DrugConditionDetail>;
}

export const DrugConditionDetailsTable = ({
  className,
  isLoading,
  asyncDataList,
}: DrugConditionDetailsTableProps) => {
  console.log('Render DrugConditionDetailsTable');

  return (
    <Table
      isStriped
      aria-label='List of drug condition details.'
      sortDescriptor={asyncDataList.sortDescriptor}
      onSortChange={asyncDataList.sort}
      className='w-full'
      selectionMode='single'
    >
      <TableHeader>
        <TableColumn
          allowsSorting={true}
          align={'start'}
          key='source_short_name'
        >
          {' '}
          Source{' '}
        </TableColumn>
        <TableColumn allowsSorting={true} align={'center'} key='source_country'>
          {' '}
          Country{' '}
        </TableColumn>
        <TableColumn
          allowsSorting={true}
          align={'center'}
          key='requires_full_time_at_risk'
        >
          {' '}
          Requires Full Time at Risk{' '}
        </TableColumn>
        <TableColumn allowsSorting={true} align={'end'} key='incidence_rate'>
          {' '}
          Incidence(%){' '}
        </TableColumn>
        <TableColumn
          allowsSorting={true}
          align={'end'}
          key='num_persons_at_risk'
        >
          {' '}
          Patients at Risk{' '}
        </TableColumn>
      </TableHeader>
      <TableBody
        items={asyncDataList.items}
        isLoading={isLoading}
        loadingContent={<Spinner label='Loading...' />}
      >
        {(item) => (
          <TableRow key={item.source_short_name + item.num_persons_at_risk}>
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
