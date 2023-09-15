"use client"
import {getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import React from "react";

function fetchData() {

}

export default function DrugConditionDetailsTable()  {

    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList<DrugConditionDetail>({

        async load({signal}) {
            let res = await fetch(`http://localhost:3001/drug-condition-details`, {
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
                items: items.sort((a: DrugConditionDetail, b:DrugConditionDetail) => {
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
                table: "min-h-[800px]",
            }}
        >
            <TableHeader>
                <TableColumn key="source_short_name" allowsSorting> Source </TableColumn>
                <TableColumn key="source_country" allowsSorting> Country </TableColumn>
                <TableColumn key="incidence_proportion" allowsSorting> Condition </TableColumn>
                <TableColumn key="incidence_rate" allowsSorting> Incidence(%) </TableColumn>
                <TableColumn key="num_persons_at_risk" allowsSorting> Patients at Risk </TableColumn>
                <TableColumn key="requires_full_time_at_risk" allowsSorting> Requires Full Time at Risk </TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item) => (
                    <TableRow key={item.incidence_rate}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}