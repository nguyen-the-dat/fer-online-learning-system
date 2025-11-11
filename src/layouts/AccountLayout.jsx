import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AccountSidebar from "../components/AccountSidebar";
import { Outlet } from "react-router-dom";

function AccountLayout() {

  return (
    <section style={{ paddingBottom: "4rem" }}>
      <Container style={{ marginTop: "2.5rem" }}>
        <Row>
          <Col lg={3} className="mb-4 mb-lg-0">
            <AccountSidebar/>
          </Col>
          <Col lg={9}>
          {/* outlet context */}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AccountLayout;
