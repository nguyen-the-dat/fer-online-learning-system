import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

export function QuizDataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilterChange = (e) => {
    const val = e.target.value;
    table.getColumn("title")?.setFilterValue(val);
  };

  return (
    <Container>
      <Row className="align-items-center my-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Filter courses..."
            value={table.getColumn("title")?.getFilterValue() ?? ""}
            onChange={handleFilterChange}
          />
        </Col>
        <Col className="text-end">
          <Button href="/dashboard/quiz-sets/add" variant="primary">
            <FaPlusCircle className="me-2" />
            New Quiz Set
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header(header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-3">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end gap-2 my-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
