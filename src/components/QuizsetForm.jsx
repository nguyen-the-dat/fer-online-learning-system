import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { updateCourse } from "../api/courses";
// import { updateQuizSetForCourse } from "../api/courses";

const formSchema = z.object({
  quizSetId: z.string().min(1, "Please select a quiz set"),
});

export const QuizSetForm = ({
  initialData = {},
  courseId,
  options = [],
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const hasOptions = options.length > 0;

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      quizSetId: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const selectedQuizSet = options.find(
        (opt) => opt.value === values.quizSetId
      );

      if (!selectedQuizSet) throw new Error("Invalid quiz set");
      console.log("Selected Quiz Set:", selectedQuizSet);
      await updateCourse(courseId, {
        quizSetId: selectedQuizSet.value,
      });
      onUpdate({ quizSetId: selectedQuizSet.value });
      toast.success("Quiz set updated");
      toggleEdit();

      reset({ quizSetId: values.quizSetId });
    } catch (error) {
      console.error("Error updating quiz set:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Quiz Set</strong>
        {hasOptions && (
          <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Pencil className="me-2" /> Edit Quiz Set
              </>
            )}
          </Button>
        )}
      </div>

      {!hasOptions ? (
        <Alert variant="info" className="mb-0">
          No quiz sets available. Please create one first.
        </Alert>
      ) : !isEditing ? (
        <p className={initialData.quizSetTitle ? "" : "text-muted fst-italic"}>
          {initialData.quizSetTitle || "No quiz set selected"}
        </p>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Select
              {...register("quizSetId")}
              isInvalid={!!errors.quizSetId}
              disabled={isSubmitting || !hasOptions}
            >
              <option value="">Select a quiz set</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.quizSetId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting || !hasOptions}
          >
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
