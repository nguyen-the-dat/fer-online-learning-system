import React from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
export function SignupForm({ role }) {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const allowedRoles = ["student", "instructor"];
      const userRole = allowedRoles.includes(role) ? role : "student";

      // const name = `${firstName} ${lastName}`;
      const response = await registerUser({
        email,
        password,
        firstName,
        lastName,
        role: userRole,
      });

      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h3 className="mb-4">Sign Up</h3>
          <p className="text-muted">
            Enter your information to create an account
          </p>
          <Form onSubmit={onSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="first-name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first-name"
                    placeholder="Max"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="last-name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last-name"
                    placeholder="Robinson"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create an account
            </Button>
          </Form>

          <div className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-underline">
              Sign in
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
