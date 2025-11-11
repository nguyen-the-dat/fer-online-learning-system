import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SignupForm } from './SignupForm';
import { useParams } from 'react-router-dom';
export const RegisterPage = () => {
  const { role } = useParams(); 
    console.log("RegisterPage role:", role);
  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <SignupForm role={role} />
        </Col>
      </Row>
    </Container>
  );
};

