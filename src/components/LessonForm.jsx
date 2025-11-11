import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSlug } from "../../lib/convert-data";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { PlusCircle, Pencil, Loader2 } from "lucide-react";

//import { getSlug } from "@/lib/convertData";
// import { createLesson, reorderLessons } from "@/app/action/lesson";
import { LessonList } from "./LessonList"; // đã convert
import { LessonModal } from "./LessonModal"; // đã convert
import { createLesson, reorderLessons } from "../api/lessons";
import { toast } from "react-toastify";
import { getModuleDetail, updateModule } from "../api/modules";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const LessonForm = ({
  initialData,
  moduleId,
  courseId,
  onUpdateLessons,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState(null);

  const toggleCreating = () => setIsCreating((prev) => !prev);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (Array.isArray(initialData)) {
      setLessons(initialData);
    }
  }, [initialData]);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", getSlug(values.title));
      formData.append("moduleId", moduleId);
      formData.append("order", lessons.length);
      formData.append("courseId", courseId);
      const lesson = await createLesson(formData);

      setLessons((prev) => [
        ...prev,
        {
          id: lesson?.id.toString(),
          title: values.title,
        },
      ]);

      // update module.lessonIds
      const moduleData = await getModuleDetail(moduleId);
      const currentLessonIds = moduleData?.lessonIds || [];
      const updatedLessonIds = [...currentLessonIds, lesson.id];
      onUpdateLessons(lesson);
      await updateModule(moduleId, { lessonIds: updatedLessonIds });
      toggleCreating();
      reset();
      toast.success("Lesson created successfully!");
    } catch (error) {
      alert("Error creating lesson");
    }
  };

  const onReorder = async (updateData) => {
    try {
      console.log("updateData", updateData);
      setIsUpdating(true);
      setLessons(updateData);
      onUpdateLessons(updateData);
      await reorderLessons(updateData);

      // toast.success("Lessons reordered!");
    } catch (error) {
      alert("Error reordering lessons");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id) => {
    const lesson = lessons.find((item) => item.id === id);
    setLessonToEdit(lesson);
    setIsEditing(true);
  };

  const handleUpdateLesson = (updatedValues) => {
    setLessons((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  return (
    <Card className="mt-4 border">
      <Card.Body>
        {isUpdating && (
          <div className="position-absolute w-100 h-100 top-0 start-0 bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Module Lessons</strong>
          <Button
            variant={isCreating ? "secondary" : "outline-primary"}
            onClick={toggleCreating}
            size="sm"
          >
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <PlusCircle size={16} className="me-2" /> Add a lesson
              </>
            )}
          </Button>
        </div>

        {isCreating && (
          <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
            <Form.Group className="mb-2">
              <FormControl
                placeholder="e.g. 'Introduction to the course...'"
                {...register("title")}
                isInvalid={!!errors.title}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </Form>
        )}

        {!isCreating && (
          <>
            {lessons?.length === 0 ? (
              <p className="text-muted fst-italic">No module</p>
            ) : (
              <LessonList
                items={lessons}
                onEdit={onEdit}
                onReorder={onReorder}
              />
            )}
            <p className="text-muted mt-3" style={{ fontSize: "0.8rem" }}>
              Drag & Drop to reorder the lessons
            </p>
          </>
        )}
      </Card.Body>

      <LessonModal
        open={isEditing}
        setOpen={setIsEditing}
        courseId={courseId}
        lesson={lessonToEdit}
        moduleId={moduleId}
        listLessons={lessons}
        setListLessons={setLessons}
        updateListLesson={onUpdateLessons}
      
      />
    </Card>
  );
};
