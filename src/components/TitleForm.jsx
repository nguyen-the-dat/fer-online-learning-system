import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { updateCourse } from "../api/courses";

// Zod schema
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData = {}, courseId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

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
      title: initialData.title || "",
    },
  });

  useEffect(() => {
    reset({
      title: initialData.title || "",
    });
  }, [initialData, reset]);

  const onSubmit = async (values) => {
    try {
      await updateCourse(courseId, values);
      toast.success("Course title updated successfully");
      toggleEdit();
      if (onUpdate) onUpdate(values);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Title</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="me-2" size={14} /> Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-muted mb-0">{initialData.title || "No title"}</p>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2" controlId="formTitle">
            <Form.Control
              type="text"
              placeholder="e.g. 'Advanced web development'"
              disabled={isSubmitting}
              {...register("title")}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
