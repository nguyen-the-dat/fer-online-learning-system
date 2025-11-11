import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";

import { ModuleList } from "./ModuleList";
import { getSlug } from "../../lib/convert-data";
import { createModule } from "../api/modules";
import { updateCourse, fetchCourseById } from "../api/courses";
import {reorderModules} from "../api/modules";
const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const ModulesForm = ({ initialData = [], courseId, onUpdate }) => {
  const [modules, setModules] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Sync initialData
  useEffect(() => {
    setModules(initialData);
  }, [initialData]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", getSlug(data.title));
      formData.append("courseId", courseId);
      formData.append("order", modules.length);

      const module = await createModule(formData);

      // Update course.modules
      const course = await fetchCourseById(courseId);
      const currentModules = course.modules || [];
      const updatedModules = [...currentModules, module.id];
      await updateCourse(courseId, { modules: updatedModules });

      setModules((prev) => [...prev, module]);
      onUpdate({ modules: updatedModules });

      reset();
      toggleCreating();
      toast.success("Module created successfully!");
    } catch (err) {
      console.error("Error creating module:", err);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (reorderedModules) => {
    try {
      setIsUpdating(true);
      console.log('reorder modules', reorderedModules);

      reorderModules(reorderedModules);

     

      // Update local state
      setModules(reorderedModules);
      // onUpdate({ modules: reorderedModules.map((m) => m.id) });

      toast.success("Modules reordered");
    } catch (err) {
      console.error("Reorder error:", err);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id) => {
    window.location.href = `/dashboard/courses/${courseId}/modules/${id}`;
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light position-relative">
      {isUpdating && (
        <div className="position-absolute w-100 h-100 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center rounded">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Course Modules</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleCreating}>
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="me-1" /> Add a module
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <Form.Group controlId="moduleTitle" className="mb-2">
            <Form.Control
              type="text"
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
            Create
          </Button>
        </Form>
      )}

      {!isCreating && (
        <>
          {modules.length === 0 ? (
            <p className="fst-italic text-muted">No module</p>
          ) : (
            <ModuleList items={modules} onEdit={onEdit} onReorder={onReorder} />
          )}
          <p className="text-muted small mt-3">
            Drag & drop to reorder modules
          </p>
        </>
      )}
    </div>
  );
};
