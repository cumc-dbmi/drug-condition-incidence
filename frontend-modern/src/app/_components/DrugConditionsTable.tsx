"use client"
import React from "react";
import {getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import {useRouter} from "next/navigation";

 function fetchData(drugName: string, signal) {
    console.log(drugName);
    const drugList =  fetchDrugs()
    console.log("DrugList:" + drugList);
    const drugConceptId = findDrugId(drugList, "Hydrochlorothiazide");
    console.log("DRUG CONCEPT:" + drugConceptId);
    let drugConditions =  fetchDrugConditions(drugConceptId, signal);
    return drugConditions;
}

export const DrugConditionsTable = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList<DrugCondition>({

        async load({signal}) {
            let res = await fetch(`http://localhost:3001/drug-conditions`, {
                signal,
            });
            let json = await res.json();
            setIsLoading(false);
            console.log(json);
            return {
                items: json,
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    return (
        <Table
            isStriped
            aria-label="Example table with client side sorting"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            classNames={{
                table: "min-h-[400px]",
            }}
            onRowAction={(key) =>router.push(`/974166/${key}`) }
        >
            <TableHeader>
                <TableColumn key="outcome_concept_name" allowsSorting> Condition </TableColumn>
                <TableColumn key="incidence_proportion_range_low" allowsSorting> Lowest Incidence (%) </TableColumn>
                <TableColumn key="incidence_proportion_range_high" allowsSorting> Highest Incidence (%) </TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item) => (
                    <TableRow key={item.outcome_concept_id}>
                        {(columnKey) => <TableCell>{isNaN(getKeyValue(item, columnKey))
                            ? getKeyValue(item, columnKey)
                            : (getKeyValue(item, columnKey)==0? "~0.0": getKeyValue(item, columnKey)*100)
                        }</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}