import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "./Logo";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";
const MainNav = ({ items }) => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <>
      <div className="d-flex gap-3 gap-lg-4">
        <Link to="/">
          <Logo />
        </Link>

        {items?.length ? (
          <nav className="d-none d-lg-flex gap-3">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.disabled ? "#" : item.href}
                className="d-flex align-items-center fs-5 fw-medium text-body text-decoration-none hover-opacity"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <nav className="d-flex align-items-center gap-3">
        {!isAuthenticated ? (
          <div className="d-flex align-items-center gap-3">
            <Link to="/login">
              <button className="btn btn-dark px-3 text-white text-decoration-none">
                Login
              </button>
            </Link>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Register
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/register/student">
                  Student
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register/instructor">
                  Instructor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-user">
              <Avatar src={user.profilePicture} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/account">
                Profiles
              </Dropdown.Item>

              {user.role === "instructor" && (
                <Dropdown.Item as={Link} to="/dashboard">
                  Instructor Dashboard
                </Dropdown.Item>
              )}

              <Dropdown.Item as={Link} to="/account/enrolled-courses">
                My Courses
              </Dropdown.Item>

              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </nav>
    </>
  );
};

export default MainNav;
