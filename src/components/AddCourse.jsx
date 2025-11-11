import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { createCourse } from "../api/courses";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
});

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const onSubmit = async (values) => {
    try {
      const newCourse = await createCourse(values, user);
      navigate(`/dashboard/courses/${newCourse.id}`);
      toast.success("Add new course successfully!");
    } catch (error) {
      toast.error("Error while creating a new course");
      alert("Failed to save course");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">Add New Course</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. React Bootcamp"
                disabled={isSubmitting}
                {...register("title")}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write a brief description..."
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" type="button" href="/courses">
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
