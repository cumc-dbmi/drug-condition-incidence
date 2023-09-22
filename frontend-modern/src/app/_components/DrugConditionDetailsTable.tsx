"use client";

import React from "react";
import {getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";


interface DrugConditionDetailsTableProps {
    id: number,
    className: string,
    data: Promise<DrugConditionDetail[]>
}

export const DrugConditionDetailsTable = ({id, className, data}: DrugConditionDetailsTableProps) => {

    console.log("Render DrugConditionDetailsTable");
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList<DrugConditionDetail>({

        async load({signal}) {
            let json = await data;
            setIsLoading(false);
            return {
                items: json,
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    const columnA: any = sortDescriptor.column;
                    const columnB: any = sortDescriptor.column;
                    // @ts-ignore
                    let first = a[columnA];
                    // @ts-ignore
                    let second = b[columnB];
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
            aria-label="List of drug condition details."
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            className="w-full max-w-screen-xl"
            selectionMode="single"
        >
            <TableHeader>
                <TableColumn key="source_short_name" allowsSorting> Source </TableColumn>
                <TableColumn key="source_country" allowsSorting> Country </TableColumn>
                <TableColumn key="requires_full_time_at_risk" allowsSorting> Requires Full Time at Risk </TableColumn>
                <TableColumn key="incidence_rate" allowsSorting> Incidence(%) </TableColumn>
                <TableColumn key="num_persons_at_risk" allowsSorting> Patients at Risk </TableColumn>

            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..."/>}
            >
                {(item) => (
                    <TableRow key={item.source_short_name + item.num_persons_at_risk}>
                        {(columnKey) => <TableCell>{isNaN(getKeyValue(item, columnKey))
                            ? getKeyValue(item, columnKey)
                            : (getKeyValue(item, columnKey) == 0 ? "~0.0" : getKeyValue(item, columnKey))
                        }</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}