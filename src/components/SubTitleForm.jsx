import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { updateCourse } from "../api/course";
import { updateCourse } from "../api/courses";
import { toast } from "react-toastify";
const formSchema = z.object({
  subtitle: z.string().min(1, {
    message: "SubTitle is required",
  }),
});

export const SubTitleForm = ({ initialData = {}, courseId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      subtitle: initialData.subtitle || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await updateCourse(courseId, values);
      toggleEdit();
      toast.success("Course subtitle updated successfully");
      if (onUpdate) onUpdate(values);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    reset({
      subtitle: initialData.subtitle || "",
    });
  }, [initialData, reset]);
  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Subtitle</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="me-2" size={14} />
              Edit SubTitle
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-muted mb-0">
          {initialData.subtitle || "No subtitle"}
        </p>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2" controlId="formSubtitle">
            <Form.Control
              type="text"
              placeholder="e.g. 'Advanced web development'"
              disabled={isSubmitting}
              {...register("subtitle")}
              isInvalid={!!errors.subtitle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subtitle?.message}
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
