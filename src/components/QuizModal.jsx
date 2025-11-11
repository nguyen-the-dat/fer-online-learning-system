import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import { addQuizAssessment } from "@/app/action/quiz"; 
import { useNavigate } from "react-router-dom";

const QuizModal = ({ quizzes, courseId, quizSetId, open, setOpen }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const totalQuizzes = quizzes.length;
  const currentQuiz = quizzes[quizIndex];

  const handleNavigation = (type) => {
    if (type === "next" && quizIndex < totalQuizzes - 1) {
      setQuizIndex(quizIndex + 1);
    } else if (type === "prev" && quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    }
  };

  const updateAnswer = (e, quizId, label) => {
    const checked = e.target.checked;
    const answer = {
      quizId,
      options: { option: label },
    };
    const filtered = answers.filter((a) => a.quizId !== quizId);
    setAnswers([...filtered, answer]);
  };

  const submitQuiz = async (e) => {
    e.preventDefault();
    try {
    //   await addQuizAssessment(courseId, quizSetId, answers);
      setOpen(false);
      navigate(0);
      alert("Thanks for submitting the quiz!");
    } catch (error) {
      alert("Problem in submitting the quiz.");
      console.error(error);
    }
  };

  return (
    <Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{currentQuiz.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <strong>
            {quizIndex + 1} / {totalQuizzes}
          </strong>{" "}
          — A question can have multiple answers. No negative marking.
        </div>
        <Form>
          <Row>
            {currentQuiz.options.map((option, idx) => (
              <Col md={6} key={idx} className="mb-3">
                <Form.Check
                  type="radio"
                  name={`quiz-${quizIndex}`}
                  id={`quiz-${quizIndex}-option-${idx}`}
                  label={option.label}
                  onChange={(e) =>
                    updateAnswer(e, currentQuiz.id, option.label)
                  }
                />
              </Col> 
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
       <div className="d-flex justify-content-between w-100">
         <Button
          variant="secondary"
          disabled={quizIndex === 0}
          onClick={() => handleNavigation("prev")}
        >
          &larr; Previous
        </Button>
        <Button
          variant="success"
          type="submit"
          onClick={submitQuiz}
        >
          Submit
        </Button>
        <Button
          variant="primary"
          disabled={quizIndex >= totalQuizzes - 1}
          onClick={() => handleNavigation("next")}
        >
          Next &rarr;
        </Button>
       </div>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
