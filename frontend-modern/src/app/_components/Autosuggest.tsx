"use client";

import {useEffect, useRef} from "react";
import {Card, CardBody, Input, Listbox, ListboxItem} from "@nextui-org/react";


import useAutosuggest from "@/app/_hooks/useAutosuggest";
import classes from "./Autosuggest.module.css";
import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";

interface Props {
    data: AutosuggestListboxItem[];
}

export const Autosuggest = ({data}: Props) => {
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
            <Input isRequired isClearable
                   id="drugName"
                   name="drugName"
                   size="lg" variant="bordered" className="md:rt-r-w-max-content"
                   label="Enter generic drup name"

                   value={searchedValue}
                   autoComplete='off'
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}
                   ref={inputSearchRef}
                   color='secondary'
            />
            <Card className="m-0">
                <CardBody className="p-0 ">
                    <Listbox  className="p-0">
                       {!suggestions.length && searchedValue.length && !selectedSuggestion.length ? (
                        <ListboxItem key={""}
                                     className={classes.itemListNot}>
                            <p>Nothing to show :(</p>
                        </ListboxItem>
                        ) : (
                            suggestions.map(({label, value}: any, index: string | number) => (
                            <ListboxItem
                                key={index}
                                className={`${classes.itemList} ${index === activeSuggestion - 1 ? classes.activeItem : ""}`}
                                onClick={() => handleClick({label, value})}>
                                {label}
                            </ListboxItem>
                            ))
                        )
                       }
                    </Listbox>
                </CardBody>
            </Card>
        </div>

    );
}