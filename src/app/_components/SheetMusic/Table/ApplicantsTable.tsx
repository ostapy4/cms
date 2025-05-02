"use client";

import { COLUMNS } from "./columns";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { SheetMusic } from "@prisma/client";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/_components/common/Table";
import { Button, IconButton } from "app/_components/common/UI";

export type ApplicantsTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  deleteSheet: (id: string) => void;
  setID: (id: string) => void;
};

export function ApplicantsTable<T>({
  data,
  columns,
  deleteSheet,
  setID,
}: ApplicantsTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const [selected, setSelected] = useState(table.getAllColumns());

  function onSelectHandler(data: Column<T>[]) {
    setSelected(data);
    table
      .getAllColumns()
      .map((column) =>
        data.includes(column)
          ? column.toggleVisibility(true)
          : column.toggleVisibility(false),
      );
  }
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"w-72"}>
        <Listbox multiple={true} value={selected} onChange={onSelectHandler}>
          <div className={"relative mt-1"}>
            <ListboxButton as={Fragment}>
              <Button colorVariant={"cms"}>Columns</Button>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave={"transition ease-in duration-100"}
              leaveFrom={"opacity-100"}
              leaveTo={"opacity-0"}
            >
              <ListboxOptions
                className={
                  "absolute z-50 mt-1 max-h-60 w-full divide-y-[1px] divide-lime-600 overflow-auto rounded-md bg-ok_main-50 py-2 shadow focus:outline-none sm:text-sm"
                }
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column, idx) => {
                    return (
                      <ListboxOption
                        key={idx}
                        className={({ selected, focus }) =>
                          `relative select-none py-2 pl-10 pr-4 text-lime-900 outline-none first-letter:uppercase ${
                            focus && !selected ? "bg-lime-100/80" : ""
                          } ${selected ? "bg-lime-600 text-white" : ""}`
                        }
                        value={column}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate`}>
                              {column.id}
                            </span>
                            {selected ? (
                              <span
                                className={
                                  "absolute inset-y-0 left-0 flex items-center pl-3"
                                }
                              >
                                <FiCheck
                                  className={"size-5 text-white"}
                                  aria-hidden={"true"}
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    );
                  })}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className={"hover:bg-transparent"} key={headerGroup.id}>
              <TableHead className={"px-4"}>№</TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <TableCell className={"text-center"}>
                  {parseInt(row.id) + 1}
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={() => setID((row.original as SheetMusic).id)}
                    startIcon={
                      <FaRegEdit
                        className={
                          "size-4 text-lime-800 transition-all group-hover:scale-105 group-hover:text-lime-600"
                        }
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  <form
                    action={() => deleteSheet((row.original as SheetMusic).id)}
                  >
                    <IconButton
                      type={"submit"}
                      startIcon={
                        <FaTrash
                          className={
                            "size-4 text-red-500 transition-all group-hover:scale-105 group-hover:text-red-400"
                          }
                        />
                      }
                    />
                  </form>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={COLUMNS.length}
                className={"h-24 text-center"}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={"flex items-center gap-4"}>
        <Button
          colorVariant={"cms"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          startIcon={<FiChevronLeft className={"size-4"} />}
        >
          Previous
        </Button>
        <Button
          colorVariant={"cms"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          endIcon={<FiChevronRight className={"size-4"} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
