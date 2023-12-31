"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { CellImage } from "./cell-image";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CellUrl } from "./cell-url";
import { CellDate } from "./cell-date";
import { CellLabel } from "./cell-label";
import { CellCopy } from "./cell-copy";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  imageUrl: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      return <CellLabel url={row.original} label={row.original.label} />;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return <CellImage url={row.original} imageUrl={row.original.imageUrl} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
