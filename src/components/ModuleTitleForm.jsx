import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Pencil } from "react-bootstrap-icons";
import { getSlug } from "../../lib/convert-data";
import { updateModule } from "../api/modules";
const formSchema = z.object({
  title: z.string().min(1),
});

const ModuleTitleForm = ({ initialData, moduleId, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title,
    },
  });

  useEffect(() => {
    if (initialData?.title) {
      form.reset({
        title: initialData.title,
      });
    }
  }, [initialData?.title]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      values.slug = getSlug(values.title);

      await updateModule(moduleId, values);
      onUpdate(values);
      toast.success("Module title updated");
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Module title</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="me-1" size={16} />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="text-muted small">{initialData?.title}</div>
      )}

      {isEditing && (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formModuleTitle">
            <FormControl
              type="text"
              placeholder="e.g. 'Introduction to the course'"
              disabled={isSubmitting}
              isInvalid={!!form.formState.errors.title}
              {...form.register("title")}
            />
            <Form.Control.Feedback type="invalid">
              {form.formState.errors.title?.message}
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

export default ModuleTitleForm;
