import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateLesson } from "../api/lessons";

const LessonActions = ({ lessonId, active, updateListLesson }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(active);
  const navigate = useNavigate();

  useEffect(() => {
    setPublished(active);
  }, [lessonId, active]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!action) return;

      switch (action) {
        case "change-active": {
          const newStatus = !published;
          const lessonUpdated = await updateLesson(lessonId, {
            active: newStatus,
          });
          updateListLesson(lessonUpdated)
          setPublished(newStatus);
          toast.success(
            newStatus
              ? "The lesson has been published"
              : "The lesson has been unpublished"
          );

          break;
        }

        case "delete": {
          if (published) {
            toast.error("You cannot delete a published lesson");
            return;
          }

          // TODO: Implement actual deletion logic
          toast.success("The lesson has been deleted");
          navigate("/dashboard/lessons");
          break;
        }

        default:
          throw new Error("Unknown action");
      }
    } catch (error) {
      toast.error("Something went wrong: " + error?.message);
    } finally {
      setAction(null); // reset
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ButtonGroup>
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
      </ButtonGroup>
    </form>
  );
};

export default LessonActions;
