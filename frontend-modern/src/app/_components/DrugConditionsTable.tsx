"use client"

import React from "react";
import {getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import {useRouter} from "next/navigation";
import {Breadcrumb, Breadcrumbs, Link} from "react-aria-components";
import BreadcrumbsClasses from "@/app/_components/Breadcrumbs.module.css";

interface DrugConditionsTableProps {
    id: number,
    className: string,
    data: Promise<DrugCondition[]>
}

export const DrugConditionsTable = ({id, className, data}: DrugConditionsTableProps) => {
    const router = useRouter();
    console.log("Render DrugConditionsTable");
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList<DrugCondition>({

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
        <><Breadcrumbs className={BreadcrumbsClasses.Breadcrumbs}>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}>
                <Link className={BreadcrumbsClasses.Link}>Home</Link>
            </Breadcrumb>
            <Breadcrumb className={BreadcrumbsClasses.Breadcrumb}><Link className={BreadcrumbsClasses.Link}>Hydrochlorothiazide Drug Conditions</Link></Breadcrumb>
        </Breadcrumbs>
        <Table
            isStriped
            aria-label="List of drug conditions."
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            className="w-full"
            selectionMode="single"
            onRowAction={(key) => router.push(`/${id}/${key}`)}
        >
            <TableHeader>
                <TableColumn allowsSorting align={"start"} key="outcome_concept_name" > Condition </TableColumn>
                <TableColumn allowsSorting align={"end"}  key="incidence_proportion_range_low" > Lowest Incidence (%) </TableColumn>
                <TableColumn allowsSorting align={"end"}  key="incidence_proportion_range_high"> Highest Incidence (%) </TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..."/>}
            >
                {(item) => (
                    <TableRow key={item.outcome_concept_id}>
                        {(columnKey) => <TableCell>{isNaN(getKeyValue(item, columnKey))
                            ? getKeyValue(item, columnKey)
                            : (getKeyValue(item, columnKey) == 0 ? "~0.0" : getKeyValue(item, columnKey))
                        }</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table></>
    );
}