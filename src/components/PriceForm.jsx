import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatPrice } from "../../lib/formatPrice";
import { updateCourse } from "../api/courses";
import { toast } from "react-toastify";

const schema = z.object({
  price: z.coerce.number().min(0, "Price must be non-negative"),
});

export const PriceForm = ({ initialData, courseId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: initialData?.price ?? undefined,
    },
    mode: "onChange",
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  useEffect(() => {
    if (isEditing) {
      reset({ price: initialData?.price ?? 0 });
    }
  }, [isEditing, initialData, reset]);

  const onSubmit = async (values) => {
    try {
      await updateCourse(courseId, values);
      onUpdate(values);
      toast.success("Course updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Price</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="me-1" />
              Edit Price
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        <p className={initialData.price ? "" : "fst-italic text-muted"}>
          {initialData.price ? formatPrice(initialData.price) : "No price"}
        </p>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="priceInput">
            <InputGroup>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Set a price for your course"
                disabled={isSubmitting}
                {...register("price")}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        

          <div className="d-flex gap-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
