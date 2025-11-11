import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PersonalDetails from "../components/PersonalDetails";
import ContactInfo from "../components/ContactInfo";
import ChangePassword from "../components/ChangePassword";



const EditProfile = () => {
  
  return (
    <Container>
      {/* Personal Details Section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <PersonalDetails/>
        </Card.Body>
      </Card>

      {/* Contact Info + Change Password Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="g-4">
            <Col lg={6} sm={12}>
              <ContactInfo />
            </Col>
            <Col lg={6} sm={12}>
              <ChangePassword email={"dattt"} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
