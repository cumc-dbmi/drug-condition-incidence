// 'use client'

import React from 'react';
// import { useAutocomplete, UseAutocompleteProps } from '@mui/base/useAutocomplete';
// import { useQuery } from 'react-query';
import axios from 'axios';

interface Option {
    drug_concept_id: number;
    drug_concept_name: string;
}

async function fetchOptions() {
    const response = await axios.get<Option[]>('http://127.0.0.1/api/incidence/v2/drugs');
    return response.data;
}

function AutocompleteDropdown() {
    // const { data: options, isLoading, isError } = useQuery('options', fetchOptions);

    // const {
    //     getRootProps,
    //     getInputProps,
    //     getListboxProps,
    //     getOptionProps,
    //     groupedOptions,
    // } = useAutocomplete<Option>({
    //     id: 'autocomplete-dropdown',
    //     options: options || [],
    //     getOptionLabel: (option) => option.drug_concept_name,
    // } as UseAutocompleteProps<Option>);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (isError) {
    //     return <div>Error loading data</div>;
    // }

    return (
        // <div {...getRootProps()}>
        //     <input {...getInputProps()} placeholder="Search for a drug" />
        //     <div {...getListboxProps()}>
        //         {groupedOptions.map((option, index) => (
        //             <div {...getOptionProps({ option, index })}>{option.drug_concept_name}</div>
        //         ))}
        //     </div>
        // </div>
        <>AutoSuggest</>
    );
}

export default AutocompleteDropdown;
