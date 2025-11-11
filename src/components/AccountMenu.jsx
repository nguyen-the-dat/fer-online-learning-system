import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
const menu = [
  { label: "Profile", href: "/account" },
  { label: "Enrolled Courses", href: "/account/enrolled-courses" },
];

const AccountMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  return (
    <Nav className="flex-column mt-3">
      {menu.map((item, i) => {
        const isActive = location.pathname === item.href;
        return (
          <Nav.Link
            as={Link}
            key={i}
            to={item.href}
            className={`text-decoration-none ${
              isActive ? "fw-bold text-primary" : "text-dark"
            }`}
            style={{
              fontSize: "1rem",
              padding: "0.5rem 0",
              transition: "color 0.2s",
            }}
          >
            {item.label}
          </Nav.Link>
        );
      })}

      <Nav.Link
        as="button"
        onClick={logout}
        className="btn btn-link text-danger text-center"
        style={{
          paddingLeft: 0,
          fontWeight: 500,
        }}
      >
        Sign Out
      </Nav.Link>
    </Nav>
  );
};

export default AccountMenu;
