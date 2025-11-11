import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
// import { deleteQuiz } from "@/app/action/quiz";
import { useNavigate } from "react-router-dom";

const QuizCardActions = ({ quiz, quizSetId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // dùng react-router thay cho next/router

  const handleEdit = () => {
    console.log(`Editing quiz with ID: ${quiz.id} in quiz set ${quizSetId}`);
    // navigate(`/quiz-set/${quizSetId}/edit/${quiz.id}`); nếu có route edit
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      // await deleteQuiz(quizSetId, quiz.id);
      toast.success("Quiz deleted successfully");
      // Tùy router logic, có thể navigate hoặc reload thủ công
      window.location.reload(); // hoặc dùng context/state để update UI
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error deleting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonGroup size="sm">
      <Button variant="outline-primary" onClick={handleEdit} disabled={loading}>
        <FaPen className="me-1" />
        Edit
      </Button>
      <Button
        variant="outline-danger"
        onClick={handleDelete}
        disabled={loading}
      >
        <FaTrash className="me-1" />
        Delete
      </Button>
    </ButtonGroup>
  );
};

export default QuizCardActions;
