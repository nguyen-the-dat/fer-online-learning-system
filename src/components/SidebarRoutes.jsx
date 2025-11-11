import React from "react";
import { Nav } from "react-bootstrap";
import {
  BarChart,
  Book,
  PlusSquare,
  ClipboardData,
} from "react-bootstrap-icons";
import { NavLink, useLocation } from "react-router-dom";

const routes = [
  { icon: <BarChart className="me-2" />, label: "Analytics", href: "/dashboard" },
  { icon: <Book className="me-2" />, label: "Courses", href: "/dashboard/courses" },
  { icon: <PlusSquare className="me-2" />, label: "Add Course", href: "/dashboard/courses/add" },
  { icon: <ClipboardData className="me-2" />, label: "Quizes", href: "/dashboard/quiz-sets" },
];

const SidebarRoutes = () => {
  const location = useLocation();

  return (
    <Nav className="flex-column p-3 h-100">
      {routes.map((route, index) => {
        const isExact = location.pathname === route.href;

        return (
          <Nav.Link
            as={NavLink}
            to={route.href}
            key={index}
            className={`d-flex align-items-center px-3 py-2 rounded ${
              isExact ? "bg-light text-primary fw-bold" : "text-secondary"
            }`}
          >
            {route.icon}
            {route.label}
          </Nav.Link>
        );
      })}
    </Nav>
  );
};

export default SidebarRoutes;
