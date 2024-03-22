"use client"
import * as React from "react"

import { DataTableFacetedFilter } from "@/components/ui/columntoggle"
import { gradesOptions, clearTypeOptions, levelOptions } from "./options"


import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  volforce: number
}




export function DataTable<TData, TValue>({
  columns,
  data,
  volforce,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState({
    top50: false,
    id: false
  })
  React.useState<VisibilityState>({})
  
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  
  return (
    <div>
      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Filter by Song Name..."
          value={(table.getColumn("songName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("songName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableFacetedFilter 
          column={table.getColumn("grade")}
          title="Grade"
          options={gradesOptions}
          />
        <DataTableFacetedFilter 
          column={table.getColumn("clearType")}
          title="Clear Type"
          options={clearTypeOptions}
          />
        <DataTableFacetedFilter 
          column={table.getColumn("level")}
          title="Level Number"
          options={levelOptions}
          />
        <div className="flex-grow" /> 
        <div className="space-x-2 ">
          <p id="volforce"></p>
          <Checkbox
            id="volforce"
            onCheckedChange={(event) => {
              if (event === true) {
                table.getColumn("top50")?.setFilterValue(event)
              } else {
                table.getColumn("top50")?.setFilterValue(null)
                table.getColumn("id")?.setFilterValue(null) //why does this fix it. theres def a better way to do it but whatever
              }
            }}
          />
          <label htmlFor="volforce">
            Volforce
          </label>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => ( <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
