import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Alert } from "react-bootstrap";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateLesson } from "../api/lessons";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const LessonAccessForm = ({
  initialData,
  courseId,
  lessonId,
  updateListLesson,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [free, setFree] = useState(initialData?.isFree || false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      isFree: !!initialData?.isFree,
    },
  });

  const isFree = watch("isFree");

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    console.log("values:", values);
    try {
      const payload = {
        access: values.isFree ? "public" : "private",
      };

      const lessonUpdated = await updateLesson(lessonId, payload);
      updateListLesson(lessonUpdated);
      setFree(values.isFree);
      toast.success("Lesson updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border rounded p-3 bg-light mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Lesson access</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil size={16} className="me-1" />
              Edit Access
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={free ? "" : "text-muted fst-italic"}>
          {free
            ? "This chapter is free for preview"
            : "This chapter is not free"}
        </p>
      )}

      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <Form.Check
            type="checkbox"
            label="Check this box if you want to make this chapter free for preview"
            {...register("isFree")}
            disabled={isSubmitting}
          />

          <div className="mt-3">
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
