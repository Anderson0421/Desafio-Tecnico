import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, } from '@tremor/react';
import { useMemo } from 'react';
import { AlumnoType } from '../types/type';
import { Button as BtnNext } from '@nextui-org/react';
import { EditIcon, TrashIcon, ViewIcon } from '../components/icons/icons'
import { Link } from 'react-router-dom';

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

type Column = {
    header: string;
    accessorKey: keyof AlumnoType;
    meta: {
        align: string;
    };
};


const Button = ({ onClick, disabled, children }: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;

}) => {
    return (
        <button
            type="button"
            className="group px-2.5 py-2 text-tremor-default disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

type DatatableProps = {
    data: AlumnoType[];
    columns: Column[];
    href: string;
    functionProp: (id: number) => ()  => void;
};

export default function DataTablePersonalizado({ data, columns, href, functionProp }: DatatableProps) {
    const pageSize = 8;

    const mappedData = useMemo(() => {
        return data.map(item => {
            const mappedItem: Record<string, unknown> = {};
            columns.forEach((column: Column) => {
                if (column.accessorKey in item) {
                    mappedItem[column.accessorKey] = item[column.accessorKey];
                }
            });
            return mappedItem;
        });
    }, [data, columns]);


    const table = useReactTable({
        data: mappedData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: pageSize,
            },
        },
    });

    return (
        <>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b border-tremor-border dark:border-dark-tremor-border"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHeaderCell
                                    key={header.id}
                                    scope="col"
                                    className={classNames((header.column.columnDef.meta as { align: string })?.align)}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody >
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className={classNames((cell.column.columnDef.meta as { align: string })?.align)}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}


                            <TableCell className='flex gap-3'>
                                <Link to={`${href}/edit/${row.original.id}`}>
                                    <BtnNext className="text-xs" color='success' variant="bordered"
                                        startContent={<EditIcon iconClass={'w-5'} />}>Edit</BtnNext>
                                </Link>
                                <Link to={`${href}/detail/${row.original.id}`}>
                                    <BtnNext className="text-xs" color='warning' variant='bordered'
                                        startContent={<ViewIcon iconClass={'w-5'} />}>Detail</BtnNext>
                                </Link>
                                <BtnNext onClick={functionProp(row.original.id as number)} className="text-xs" color="danger" variant="bordered"
                                    startContent={<TrashIcon iconClass={'w-5'} />} >Delete</BtnNext>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-10 flex items-center justify-between">
                <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
                    Page{' '}
                    <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{`${table.getState().pagination.pageIndex + 1
                        }`}</span>{' '}
                    of
                    <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {' '}
                        {`${table.getPageCount()}`}
                    </span>
                </p>
                <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring dark:shadow-dark-tremor-input dark:ring-dark-tremor-ring">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Previous</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                            aria-hidden={true}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </Button>
                    <span
                        className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
                        aria-hidden={true}
                    />
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                            aria-hidden={true}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    );
}