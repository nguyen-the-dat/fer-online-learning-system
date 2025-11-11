import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateLesson } from "../api/lessons";

import { getSlug } from "../../lib/convert-data";
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const LessonTitleForm = ({
  initialData,
  courseId,
  lessonId,
  updateListLesson,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    try {
      values.slug = getSlug(values.title);
      const lessonUpdated = await updateLesson(lessonId, values);
      console.log('lessonUpdated', lessonUpdated);
      updateListLesson(lessonUpdated);
      setTitle(values.title);
      toast.success("Lesson updated");
      toggleEdit();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border rounded p-3 bg-light mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Lesson title</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil size={16} className="me-1" />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-muted">{title}</p>}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 'Introduction to the course'"
              isInvalid={!!errors.title}
              disabled={isSubmitting}
              {...register("title")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={isSubmitting || !isValid}>
            Save
          </Button>
        </Form>
      )}
    </div>
  );
};
