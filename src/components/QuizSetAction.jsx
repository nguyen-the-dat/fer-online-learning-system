import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateQuizSet } from "../api/quiz-set";
// import { changeQuizPublishState, deleteQuizSet } from "@/app/action/quiz";

export const QuizSetAction = ({
  quizSetId,
  quiz,
  isPublished,
  handleQuizsets,
}) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(quiz);
  const navigate = useNavigate();
  useEffect(() => {
    setPublished(isPublished);
  }, [quizSetId, isPublished]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (action === "changeActive") {
        const res = await updateQuizSet(quizSetId, { active: !published });
        setPublished(!published);
        toast.success(
          `Quiz ${published ? "unpublished" : "published"} successfully`
        );
        handleQuizsets(res);
        // window.location.reload(); // or you can refetch data
      } else if (action === "delete") {
        if (published) {
          toast.error("You cannot delete a published quiz set");
          return;
        }
        // await deleteQuizSet(quizSetId);
        toast.success("Quiz set deleted successfully");
        navigate("/dashboard/quiz-sets");
      } else {
        throw new Error("Invalid action");
      }
    } catch (error) {
      console.error("Error handling action:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setAction("changeActive")}
          type="submit"
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setAction("delete")}
          type="submit"
        >
          <FaTrash className="me-1" />
          Delete
        </Button>
      </div>
    </form>
  );
};
