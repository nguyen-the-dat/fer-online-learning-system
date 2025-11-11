import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateModule } from "../api/modules";
// import { changeModulePublishState, deleteModule } from "@/app/action/modules";

const ModuleActions = ({ moduleId, active, onUpdate }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(active);
  const navigate = useNavigate();

  useEffect(() => {
    setPublished(active);
  }, [moduleId, active]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!action) return;

      switch (action) {
        case "change-active": {
          const newStatus = !published;
          await updateModule(moduleId, { active: newStatus });
          setPublished(newStatus);
          toast.success(
            newStatus
              ? "The module has been published"
              : "The module has been unpublished"
          );
          onUpdate({ active: newStatus });
          break;
        }

        case "delete": {
          if (published) {
            toast.error("You cannot delete a published module");
            return;
          }

          // TODO: Uncomment and implement deleteModule if needed
          // await deleteModule(moduleId);
          toast.success("The module has been deleted");
          navigate(`/dashboard/courses/${courseId}`);
          break;
        }

        default:
          throw new Error("Unknown action");
      }
    } catch (error) {
      toast.error("Something went wrong: " + error?.message);
    } finally {
      setAction(null); // Reset action after handling
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

export default ModuleActions;
