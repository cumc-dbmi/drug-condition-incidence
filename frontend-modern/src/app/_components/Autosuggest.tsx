"use client";
import {useEffect, useRef} from "react"
import {Card, CardBody, Input, Listbox, ListboxItem} from "@nextui-org/react"


import useAutocomplete from "@/app/_hooks/useAutosuggest";
import classes from "./Autosuggest.module.css"
import {Country} from "@/app/_interfaces/Drug.interface";
interface Props {
    data: Country[]
}

export const Autosuggest = ({data}: Props) => {
    const inputSearchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputSearchRef.current) {
            inputSearchRef.current.focus()
        }
    }, [])

    const {searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick} =
        useAutocomplete(data, inputSearchRef.current)

    return (

        <div className={classes.autocomplete }>
            <Input isRequired isClearable
                   size="lg" variant="bordered" className="md:rt-r-w-max-content"
                   label="Enter generic drup name"
                   value={searchedValue}
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
                            suggestions.map(({name, flags}: Country, index: string | number) => (
                            <ListboxItem
                                key={index}
                                className={`${classes.itemList} ${index === activeSuggestion - 1 ? classes.activeItem : ""}`}
                                onClick={() => handleClick(name.common)}>
                                {name.common}
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