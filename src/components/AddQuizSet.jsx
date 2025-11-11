import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createQuizSet } from "../api/quiz-set";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
});

const AddQuizSet = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user || user.role !== "instructor") {
    return <Navigate to="/" replace />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      data.instructorId = user.id;
      data.active = false;
      const quizsetAdded = await createQuizSet(data);
      toast.success("Quiz Set Created");
      navigate(`/dashboard/quiz-sets/${quizsetAdded.id}`);
    } catch (error) {
      console.error("Error creating quiz set:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ maxWidth: 500 }} className="w-100">
        <Card.Body>
          <Card.Title className="mb-4">Create New Quiz Set</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Set Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 'Reactive Accelerator'"
                {...register("title")}
                isInvalid={!!errors.title}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => navigate("/dashboard/quiz-sets")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddQuizSet;
