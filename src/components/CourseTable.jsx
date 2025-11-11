import React, { useMemo, useState } from "react";
import { Table, Form } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../lib/formatPrice";
const CourseTable = ({ data = [] }) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatPrice(row.getValue("price") ?? 0),
      },
      {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => {
          const active = row.getValue("active");
          return (
            <span className={`badge ${active ? "bg-success" : "bg-secondary"}`}>
              {active ? "Published" : "Unpublished"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const id = row.original.id;
          return (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate(`/dashboard/courses/${id}`)}
            >
              Edit
            </Button>
          );
        },
      },
    ],
    [navigate]
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  const handleClickAdd = () => {
    navigate("/dashboard/courses/add");
  };

  return (
    <div className="container mt-4">
      <h4>Course List</h4>

      <div className="d-flex justify-content-between mb-3 align-items-center">
        <Form.Control
          type="text"
          placeholder="Search courses..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="w-50"
        />

        <Button
          size="lg"
          className="d-flex align-items-center gap-2"
          variant="dark"
          onClick={handleClickAdd}
        >
          <i className="bi bi-plus-circle-fill"></i>
          New Course
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseTable;
