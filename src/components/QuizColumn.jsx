import React from "react";
import { Button, Badge, Dropdown } from "react-bootstrap";
import { FaSort, FaEllipsisV, FaPen } from "react-icons/fa";

// Custom toggle button for Dropdown (3-dot menu)
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <Button
    variant="light"
    size="sm"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FaEllipsisV />
  </Button>
));
CustomToggle.displayName = "CustomToggle";

export const QuizColumn = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="light"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <FaSort className="ms-2" />
      </Button>
    ),
  },
  {
    accessorKey: "totalQuiz",
    header: ({ column }) => (
      <Button
        variant="light"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Quiz <FaSort className="ms-2" />
      </Button>
    ),
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <Button
        variant="light"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Published <FaSort className="ms-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished");
      return (
        <Badge bg={isPublished ? "success" : "secondary"}>
          {isPublished ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Dropdown align="end">
          <Dropdown.Toggle as={CustomToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                (window.location.href = `/dashboard/quiz-sets/${id}`)
              }
            >
              <FaPen className="me-2" />
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    },
  },
];
