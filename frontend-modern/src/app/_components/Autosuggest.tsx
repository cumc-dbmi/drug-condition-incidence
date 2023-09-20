"use client";

import {useEffect, useRef} from "react";
import {Card, CardBody, Input, Listbox, ListboxItem} from "@nextui-org/react";


import useAutosuggest from "@/app/_hooks/useAutosuggest";
import classes from "./Autosuggest.module.css";
import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";

interface Props {
    data: AutosuggestListboxItem[],
    onSelectHandler: (value: (((prevState: AutosuggestListboxItem) => AutosuggestListboxItem) | AutosuggestListboxItem)) => void,
    isRequired: boolean
}

export const Autosuggest = ({ data, onSelectHandler, isRequired }: Props) => {
    const inputSearchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputSearchRef.current) {
            inputSearchRef.current.focus();
        }
    }, [])

    const {searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick} =
        useAutosuggest(data, inputSearchRef.current);

    return (

        <div className={classes.autosuggest }>
            <Input
                    isRequired={isRequired}
                   isClearable
                   id="drugName"
                   name="drugName"
                   size="lg" variant="bordered"
                   className="md:rt-r-w-max-content"
                   label="Enter generic drup name"
                   value={searchedValue}
                   autoComplete='off'
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       handleChange(e)
                   }}
                   onKeyDown={handleKeyDown}
                   ref={inputSearchRef}
            />
            <Card className="m-0">
                <CardBody className="p-0 ">
                    <Listbox  className="p-0">
                       {!suggestions.length && searchedValue.length && !selectedSuggestion.label?.length ?
                           (<ListboxItem key={""} className={classes.itemListNot}><p>Drug not found!</p></ListboxItem>)
                           :
                           (
                            suggestions.map(({label, value}: any, index: string | number) => (
                            <ListboxItem
                                key={index}
                                className={`${classes.itemList} ${index === activeSuggestion - 1 ? classes.activeItem : ""}`}
                                onClick={() =>{
                                    handleClick({label, value})
                                    onSelectHandler({label, value})
                                }}>
                                {label}
                            </ListboxItem>))
                           )
                       }
                    </Listbox>
                </CardBody>
            </Card>
        </div>

    );
}