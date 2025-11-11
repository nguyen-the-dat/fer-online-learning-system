import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { updateQuizSet } from "../api/quiz-set";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const QuizTitleForm = ({
  initialData = {},
  quizSetId,
  handleQuizsets,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateQuizSet(quizSetId, data);

      toast.success("Quiz set title updated successfully");
      toggleEdit();
      reset(data);
      handleQuizsets(res)
    } catch (error) {
      console.error("Error updating quiz set title:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>Quiz set title</strong>
          <Button variant="light" size="sm" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <FaPen className="me-2" />
                Edit Title
              </>
            )}
          </Button>
        </div>

        {!isEditing && <div className="text-muted">{initialData.title}</div>}

        {isEditing && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="e.g. 'Advanced web development'"
                {...register("title")}
                isInvalid={!!errors.title}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};
