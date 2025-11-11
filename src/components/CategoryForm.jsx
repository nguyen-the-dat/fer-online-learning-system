import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateCourse } from "../api/courses";
import { toast } from "react-toastify";
const formSchema = z.object({
  value: z.string().min(1),
});

export const CategoryForm = ({
  initialData = {},
  courseId,
  options = [],
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      value: initialData.value || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const selectedCategory = options.find(
        (opt) => opt.title === values.value
      );

      if (!selectedCategory) throw new Error("Invalid category");

      await updateCourse(courseId, { category: selectedCategory });
      toast.success("Category updated");
      toggleEdit();
      onUpdate({ category: selectedCategory });
    } catch (error) {
      console.error("Error updating course category:", error);
      toast.error("Something went wrong");
    }
  };

  const selectedOption = options.find((opt) => opt.title === initialData.value);

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Category</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="me-2" /> Edit Category
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={selectedOption ? "" : "text-muted fst-italic"}>
          {selectedOption?.title || "No category"}
        </p>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Select
              {...register("value")}
              isInvalid={!!errors.value}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.title}>
                  {opt.title}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.value?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
          >
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
