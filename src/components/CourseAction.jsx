import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateCourse } from "../api/courses";
// import { changeCoursePublishState, deleteCourse } from "../api/course";

const CourseActions = ({ courseId, isActive, onUpdate }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);
  const navigate = useNavigate();
  useEffect(() => {
    setPublished(isActive);
  }, [courseId, isActive]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const courseUpdated = await updateCourse(courseId, {
            active: !published,
          });
          onUpdate({ active: !published });
          setPublished(() => !published);
          toast.success("The course has been updated");
          break;
        }

        case "delete": {
          if (published) {
            toast.error("You cannot delete a published course");
            return;
          } else {
            // await deleteCourse(courseId);
            toast.success("The course has been deleted");
            navigate("/courses");
          }
          break;
        }

        default:
          throw new Error("Unknown action");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <div className="d-flex gap-2 justify-content-end">
        <Button
          variant="outline-secondary"
          size="sm"
          type="submit"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          variant="danger"
          size="sm"
          type="submit"
          onClick={() => setAction("delete")}
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </Form>
  );
};

export default CourseActions;
