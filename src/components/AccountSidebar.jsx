import React from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import AccountMenu from "../components/AccountMenu";
import { useAuth } from "../context/AuthContext";

const AccountSidebar = () => {
  const {user} = useAuth();
  return (
    // <Col lg={7} md={4} sm={12} className="mb-4">
      <Card className="shadow-sm">
        <Card.Body className="text-center">
          {/* Avatar */}
          <div className="mb-3 position-relative">
            <Image
              src={user?.profilePicture}
              roundedCircle
              width={112}
              height={112}
              alt={`${user?.firstName}`}
              style={{ objectFit: "cover" }}
            />
            <input
              id="pro-img"
              type="file"
              className="d-none"
              name="profile-image"
            />
            <label
              htmlFor="pro-img"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "112px",
                height: "112px",
                cursor: "pointer",
              }}
            ></label>
          </div>

          {/* User Info */}
          <h5 className="fw-semibold">
            {user?.firstName} {user?.lastName}
          </h5>
          <p className="text-muted mb-1">{user?.email}</p>
          <p className="text-secondary small mb-0">Role: {user?.role}</p>

          <hr className="my-4" />

          {/* Menu component */}
          <AccountMenu />
        </Card.Body>
      </Card>
    // </Col>
  );
};

export default AccountSidebar;
