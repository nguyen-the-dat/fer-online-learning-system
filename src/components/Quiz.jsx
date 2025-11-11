import React, { useState } from "react";
import { Button, Badge, Card } from "react-bootstrap";
import QuizModal from "./QuizModal";

const Quiz = ({ courseId, quizSet, isTaken }) => {
  const [open, setOpen] = useState(false);

  //   const quizzes = quizSet.quizIds.map((quiz) => ({
  //     id: quiz._id.toString(),
  //     title: quiz.title,
  //     description: quiz.description,
  //     options: quiz.options.map((option) => ({
  //       label: option.text,
  //       isTrue: option.is_correct,
  //     })),
  //   }));

  // [
  //   {
  //     "id": 1,
  //     "title": "Which of the following is a programming language?",
  //     "description": "Identify the programming language among the options.",
  //     "options": [
  //       {
  //         "text": "HTML",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "CSS",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "Python",
  //         "is_correct": true
  //       },
  //       {
  //         "text": "Photoshop",
  //         "is_correct": false
  //       }
  //     ],
  //     "explanations": "Python is a programming language.",
  //     "mark": 5,
  //     "slug": "programming-language"
  //   },
  //   {
  //     "id": 2,
  //     "title": "Which of these is a markup language?",
  //     "description": "Pick the correct markup language.",
  //     "options": [
  //       {
  //         "text": "JavaScript",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "HTML",
  //         "is_correct": true
  //       },
  //       {
  //         "text": "C++",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "Java",
  //         "is_correct": false
  //       }
  //     ],
  //     "explanations": "HTML is used to define the structure of web pages.",
  //     "mark": 5,
  //     "slug": "markup-language"
  //   },
  //   {
  //     "id": 1753034706471,
  //     "title": "What is the capital of VietNam",
  //     "description": "Test question",
  //     "options": [
  //       {
  //         "text": "Ha Noi",
  //         "is_correct": true
  //       },
  //       {
  //         "text": "Ho Chi Minh",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "Da Nang",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "Hai Phong",
  //         "is_correct": false
  //       }
  //     ],
  //     "explanations": "",
  //     "mark": 5,
  //     "slug": "hat-is-the-capital-of-ietam"
  //   },
  //   {
  //     "id": 1753034795422,
  //     "title": "new ques",
  //     "description": "new que",
  //     "options": [
  //       {
  //         "text": "A",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "B",
  //         "is_correct": true
  //       },
  //       {
  //         "text": "D",
  //         "is_correct": false
  //       },
  //       {
  //         "text": "E",
  //         "is_correct": false
  //       }
  //     ],
  //     "explanations": "",
  //     "mark": 5,
  //     "slug": "new-ques"
  //   }
  // ]

  const quizzes = quizSet.questions.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    options: quiz.options.map((option) => ({
      label: option.text,
      isTrue: option.is_correct,
    })),
  }));

  return (
    <>
      <Card style={{ maxWidth: "270px" }}>
        <Card.Header
          className="text-center text-white"
          style={{ background: "linear-gradient(to right, #0ea5e9, #6366f1)" }}
        >
          <strong>{quizSet.title}</strong>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between mb-2 text-muted">
            <span>Total Mark</span>
            <Badge bg="success" text="dark">
              {/* {quizSet.quizIds.length * 5} */}20
            </Badge>
          </div>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Taking the quiz is optional but it is highly recommended.
          </p>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setOpen(true)}
          >
            <i className="bi bi-journal-text me-2"></i>
            {isTaken ? "Quiz Taken" : "Take Quiz"}
          </Button>
        </Card.Body>
      </Card>

      <QuizModal
        quizzes={quizzes}
        courseId={courseId}
        quizSetId={quizSet.id.toString()}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Quiz;
