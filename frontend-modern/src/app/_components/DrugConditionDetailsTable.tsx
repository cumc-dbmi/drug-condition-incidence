'use client';

import React from 'react';
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import { AsyncListData } from '@react-stately/data';
import { FaInfoCircle } from 'react-icons/fa';

interface DrugConditionDetailsTableProps {
  className: string;
  isLoading: boolean;
  asyncDataList: AsyncListData<DrugConditionDetail>;
}

function formatLargeNumber(num_persons_at_risk: number): string {
  const formattedNumber = new Intl.NumberFormat().format(num_persons_at_risk);

  if (formattedNumber.length <= 9) {
    return formattedNumber; // Return as is if the number is not long enough
  }

  // Remove any existing separators like commas
  const plainNumber = formattedNumber.replace(/,/g, '');

  const firstPart = plainNumber.slice(0, 9);
  const secondPart = plainNumber.slice(9);

  return `${firstPart}.${secondPart}`;
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
          <Tooltip
            content={
              <div className='max-w-xs px-1 py-2 '>
                <div className='text-small font-bold'>Time at Risk</div>
                <div className='text-tiny'>
                  <h3>Yes</h3>
                  Includes only patients who are observed up through the entire
                  specified time at risk (e.g., 1 year) or who developed the
                  condition; this is usually greater than the true incidence
                  <h3>No</h3>
                  Includes patients whether or not they were observed for the
                  entire time at risk; this is always less than or equal to the
                  true incidence
                </div>
              </div>
            }
          >
            <Chip
              startContent={<FaInfoCircle size={14} aria-label='More info' />}
              variant='light'
            >
              Requires Full Time at Risk
            </Chip>
          </Tooltip>{' '}
        </TableColumn>
        <TableColumn allowsSorting={true} align={'end'} key='incidence_rate'>
          {' '}
          Incidence(%){' '}
        </TableColumn>
        <TableColumn
          allowsSorting={true}
          className={'text-right'}
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
            <TableCell>{item.source_short_name}</TableCell>
            <TableCell className={'text-center'}>
              {item.source_country}
            </TableCell>
            <TableCell className={'text-center'}>
              {item.requires_full_time_at_risk}
            </TableCell>
            <TableCell className={'text-center'}>
              {isNaN(item.incidence_rate)
                ? item.incidence_rate
                : item.incidence_rate === 0
                ? '~0.0'
                : item.incidence_rate}
            </TableCell>
            <TableCell className={'text-right'}>
              {formatLargeNumber(item.num_persons_at_risk)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
