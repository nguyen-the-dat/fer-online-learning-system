import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, Button } from "react-bootstrap";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateLesson } from "../api/lessons";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const LessonDescriptionForm = ({
  initialData,
  courseId,
  lessonId,
  updateListLesson,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    try {
      const lessonUpdated = await updateLesson(lessonId, values);
      updateListLesson(lessonUpdated);
      setDescription(values.description);
      toast.success("Lesson updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border rounded p-3 bg-light mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Chapter Description</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil size={16} className="me-1" />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-muted">{description}</p>}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="e.g. 'This course is about...'"
              isInvalid={!!errors.description}
              disabled={isSubmitting}
              {...register("description")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
