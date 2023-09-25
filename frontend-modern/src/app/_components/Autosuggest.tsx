'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardBody, Input, Listbox, ListboxItem } from '@nextui-org/react';

import useAutosuggest from '@/app/_hooks/useAutosuggest';
import classes from './Autosuggest.module.css';
import { AutosuggestListboxItem } from '@/app/_components/Autosuggestion.interface';

interface Props {
  data: AutosuggestListboxItem[];
  onSelectHandler: (
    value:
      | ((prevState: AutosuggestListboxItem) => AutosuggestListboxItem)
      | AutosuggestListboxItem
  ) => void;
  isRequired: boolean;
  isDisabled: boolean;
  isClearable: boolean;
  id: string;
  size: 'sm' | 'md' | 'lg';
  label: React.ReactNode;
  variant: 'flat' | 'faded' | 'bordered' | 'underlined';
}

export const Autosuggest = ({
  data,
  onSelectHandler,
  isRequired,
  isDisabled,
  isClearable,
  id,
  size,
  label,
  variant,
}: Props) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  const {
    searchedValue,
    suggestions = [],
    selectedSuggestion,
    activeSuggestion,
    handleChange,
    handleKeyDown,
    handleClick,
  } = useAutosuggest(data, inputSearchRef.current);

  return (
    <div className={classes.autosuggest}>
      <Input
        isRequired={isRequired}
        isDisabled={isDisabled}
        isClearable={isClearable}
        id={id}
        size={size}
        variant={variant}
        label={label}
        className='md:rt-r-w-max-content'
        value={searchedValue}
        autoComplete='off'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        onKeyDown={handleKeyDown}
        ref={inputSearchRef}
      />
      <Card className='m-0'>
        <CardBody className='p-0 '>
          <Listbox className='p-0'>
            {!suggestions.length &&
            searchedValue.length &&
            !selectedSuggestion.label?.length ? (
              <ListboxItem key={''} className={classes.itemListNot}>
                <p>Drug not found!</p>
              </ListboxItem>
            ) : (
              suggestions.map(
                ({ label, value }: any, index: string | number) => (
                  <ListboxItem
                    key={index}
                    className={`${classes.itemList} ${
                      index === activeSuggestion - 1 ? classes.activeItem : ''
                    }`}
                    onClick={() => {
                      handleClick({ label, value });
                      onSelectHandler({ label, value });
                    }}
                  >
                    {label}
                  </ListboxItem>
                )
              )
            )}
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
};
