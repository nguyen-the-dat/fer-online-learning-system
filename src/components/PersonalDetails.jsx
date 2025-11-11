import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserByEmail } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const PersonalDetails = () => {
  const { user, setUser } = useAuth();
  const [infoState, setInfoState] = useState(null);
  useEffect(() => {
    if (user) {
      setInfoState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        designation: user.designation || "",
        bio: user.bio || "",
      });
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const trimmedData = {
      firstName: infoState.firstName.trim(),
      lastName: infoState.lastName.trim(),
      email: infoState.email.trim(),
      designation: infoState.designation.trim(),
      bio: infoState.bio.trim(),
    };

    if (!trimmedData.firstName || !trimmedData.lastName) {
      toast.error("First name and last name are required.");
      return;
    }

    if (trimmedData.bio.length < 10) {
      toast.error("Bio must be at least 10 characters.");
      return;
    }

    const isSame =
      trimmedData.firstName === user.firstName &&
      trimmedData.lastName === user.lastName &&
      trimmedData.designation === user.designation &&
      trimmedData.bio === user.bio;

    if (isSame) {
      toast.info("No changes detected.");
      return;
    }

    try {
      const updatedUser = await updateUserByEmail(
        trimmedData.email,
        trimmedData
      );
      setUser(updatedUser);
      toast.success("User info updated successfully");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <h5 className="mb-4">Personal Detail :</h5>
      <Form onSubmit={handleUpdate}>
        <Row className="mb-3">
          <Col lg={6}>
            <Form.Group controlId="firstName">
              <Form.Label>
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={infoState?.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="lastName">
              <Form.Label>
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={infoState?.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg={6}>
            <Form.Group controlId="email">
              <Form.Label>
                Your Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={infoState?.email}
                disabled
                readOnly
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="designation">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Designation"
                name="designation"
                value={infoState?.designation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="bio" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Message"
            name="bio"
            value={infoState?.bio}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default PersonalDetails;
