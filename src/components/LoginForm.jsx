import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCredentialLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";
export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const response = await createCredentialLogin(formData);

      login({
        token: response.accessToken,
        user: response.user,
      });

      toast.success("Login successful");
      navigate("/courses");
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Error:", error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-3 shadow">
        <Card.Body>
          <h2 className="mb-4">Login</h2>
          <p className="text-muted mb-4">
            Enter your email below to login to your account
          </p>

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <a href="/register/instructor">Instructor</a> or{" "}
            <a href="/register/student">Student</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
