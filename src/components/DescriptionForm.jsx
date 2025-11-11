import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { updateCourse } from "../api/course";
import { toast } from "react-toastify";
import { updateCourse } from "../api/courses";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({ initialData = {}, courseId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await updateCourse(courseId, values);
      toast.success("Course updated");
      toggleEdit();
      if (onUpdate) onUpdate(values);
    } catch (error) {
      console.error("Error updating course description:", error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    reset({
      description: initialData.description || "",
    });
  }, [initialData, reset]);

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Description</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="me-2" size={14} />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={initialData.description ? "" : "fst-italic text-muted"}>
          {initialData.description || "No description"}
        </p>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2" controlId="formDescription">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="e.g. 'This course is about...'"
              disabled={isSubmitting}
              {...register("description")}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
