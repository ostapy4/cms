"use client";

import { SheetMusic } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";

import { Button } from "app/_components/common/UI";

export const COLUMNS: ColumnDef<SheetMusic, unknown>[] = [
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <TbArrowsUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <TbArrowsUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <TbArrowsUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "griffType",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Griff Type
          <TbArrowsUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <TbArrowsUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <TbArrowsUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawDate = row.getValue("createdAt") as string;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [formattedDate, setFormattedDate] = useState<string | null>(null);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setFormattedDate(new Date(rawDate).toLocaleDateString());
      }, [rawDate]);

      return <span className={"font-medium"}>{formattedDate || "..."}</span>;
    },
  },
];
