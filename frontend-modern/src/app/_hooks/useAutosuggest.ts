import { SetStateAction, useEffect, useState } from "react"
import {AutosuggestListboxItem} from "@/app/_components/Autosuggestion.interface";

const useAutosuggest = (data: any[], inputSearchRef: HTMLInputElement | null) => {
    const [searchedValue, setSearchedValue] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [selectedSuggestion, setSelectedSuggestion] = useState("")
    const [activeSuggestion, setActiveSuggestion] = useState(0)

    useEffect(() => {
        if (inputSearchRef) {
            inputSearchRef.focus()
        }
    }, [])

    const handleChange = (event: { target: { value: SetStateAction<string> } }): void => {
        if (event.target.value !== "") {
            const filteredSuggestions = data.filter(itemData => {
                const enteredValue =event.target.value.toString().toUpperCase()
                const listItemLabel = itemData.label.toUpperCase()
                // maybe improve this ot show starts with option first then includes
                return listItemLabel && listItemLabel.startsWith(enteredValue) && listItemLabel !== enteredValue
            })
            setSearchedValue(event.target.value)
            setSuggestions(filteredSuggestions)
        } else {
            setSearchedValue("")
            setSuggestions([])
            setSelectedSuggestion("")
            setActiveSuggestion(0)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
            setActiveSuggestion(activeSuggestion + 1)
        } else if (event.key === "ArrowUp" && activeSuggestion > 1) {
            setActiveSuggestion(activeSuggestion - 1)
        } else if (event.key === "Enter") {
            setSearchedValue(suggestions[activeSuggestion - 1].label)
            setSelectedSuggestion(suggestions[activeSuggestion - 1].label)
            setSuggestions([])
            setActiveSuggestion(0)
        }
    }

    const handleClick = (selected: AutosuggestListboxItem) => {
        setSearchedValue(selected.label)
        setSuggestions([])
        setSelectedSuggestion(selected.label)
        setActiveSuggestion(0)
        //do something else
    }

    return { searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick }
}

export default useAutosuggest