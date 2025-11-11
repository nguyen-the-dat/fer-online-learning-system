// Navbar.jsx
import React from "react";
import { Container, Dropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="bg-light shadow-sm h-100 position-relative"
      style={{ zIndex: 1060 }}
    >
        <Dropdown align="end" >
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/40"}
              className="rounded-circle"
              width={40}
              height={40}
              alt="Avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-end" style={{ zIndex: 9999 }}>
            <Dropdown.Item href="/account">Profile</Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

export default Navbar;
