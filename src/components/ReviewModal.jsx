import React from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { createNewTestimonials, hasReviewed } from "../api/testimonials";
import { useAuth } from "../context/AuthContext";

const formSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "Rating can be 1 to 5" })
    .max(5, { message: "Rating can be 1 to 5" }),
  review: z.string().min(1, { message: "Description is required!" }),
});

const ReviewModal = ({ show, onHide, courseId }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { rating: "", review: "" },
  });

  const onSubmit = async (values) => {
    try {
      const reviewed = await hasReviewed(user.id, courseId);

      if (reviewed) {
        toast.error("You have already submitted a review for this course.");
        return;
      }

      const result = await createNewTestimonials({
        ...values,
        user, // gửi cả object user
        courseId,
      });

      if (result) {
        toast.success("Review added");
        onHide();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Submit Your Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Course Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g 5"
              min={1}
              max={5}
              isInvalid={!!errors.rating}
              disabled={isSubmitting}
              {...register("rating")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rating?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="review">
            <Form.Label>Your Review</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Write a brief overview about the course"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Course review"
                style={{ height: "100px" }}
                isInvalid={!!errors.review}
                {...register("review")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.review?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
