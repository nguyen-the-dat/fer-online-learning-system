// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
// import { FaCircle, FaCheckCircle } from "react-icons/fa";
// import { QuizSetAction } from "../components/QuizSetAction";
// import { QuizTitleForm } from "../components/QuizTitleForm";
// import { AddQuizForm } from "../components/AddQuizForm";
// import { useParams } from "react-router-dom";
// import { getQuizSetById } from "../api/quiz-set";
// import QuizCardActions from "../components/QuizCardActions";
// import { Alert } from "react-bootstrap";
// export default function EditQuizSet() {
//   const [quizSet, setQuizSet] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getQuizSetById(id);
//       setQuizSet(data);
//     }

//     fetchData();
//   }, [id]);

//   if (!quizSet) return null;

//   const handleQuizsets = (updateValue) => {
//     setQuizSet((prev) => ({
//       ...prev,
//       ...updateValue,
//       questions: updateValue.questions
//         ? mergeQuestions(prev.questions || [], updateValue.questions)
//         : prev.questions || [],
//     }));
//   };

//   const mergeQuestions = (oldQuestions = [], newQuestions = []) => {
//     const map = new Map();

//     // Add old questions
//     for (const q of oldQuestions) {
//       map.set(q.id, { ...q });
//     }

//     // Override or add new questions
//     for (const q of newQuestions) {
//       const existing = map.get(q.id);
//       map.set(q.id, { ...existing, ...q });
//     }

//     return Array.from(map.values());
//   };

//   return (
//     <>
//       {quizSet?.active === false && (
//         <Alert variant="warning">
//           This quiz is unpublished. It will not be visible in the course.
//         </Alert>
//       )}
//       <Container className="my-4">
//         <div className="d-flex justify-content-end mb-3">
//           <QuizSetAction
//             quizSetId={id}
//             isPublished={quizSet.active}
//             handleQuizsets={handleQuizsets}
//           />
//         </div>

//         <Row className="mt-4">
//           {/* Quiz List */}
//           <Col lg={6} className="order-lg-1 order-2 mb-4">
//             <h4>Quiz List</h4>
//             {quizSet.questions.map((quiz) => (
//               <Card key={quiz.id} className="mb-3 shadow-sm border">
//                 <Card.Body>
//                   <Card.Title>{quiz.title}</Card.Title>
//                   <Row>
//                     {quiz.options.map((option, idx) => (
//                       <Col sm={6} key={idx} className="mb-2">
//                         <div className="d-flex align-items-center text-muted">
//                           {option.is_correct ? (
//                             <FaCheckCircle className="me-2 text-success" />
//                           ) : (
//                             <FaCircle className="me-2" />
//                           )}
//                           <span>{option.text}</span>
//                         </div>
//                       </Col>
//                     ))}
//                   </Row>
//                   <div className="d-flex justify-content-end mt-3">
//                     <QuizCardActions quiz={quiz} quizSetId={id} />
//                   </div>
//                 </Card.Body>
//               </Card>
//             ))}
//           </Col>

//           {/* Quiz Form */}
//           <Col lg={6} className="order-lg-2 order-1 mb-4">
//             <h4 className="mb-3">Customize your quiz set</h4>
//             <div className="mb-4">
//               <QuizTitleForm
//                 initialData={{ title: quizSet.title }}
//                 quizSetId={id}
//                  handleQuizsets={handleQuizsets}
//               />
//             </div>
//             <div>
//               <AddQuizForm quizSetId={id}  handleQuizsets={handleQuizsets}/>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { FaCircle, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { QuizSetAction } from "../components/QuizSetAction";
import { QuizTitleForm } from "../components/QuizTitleForm";
import { AddQuizForm } from "../components/AddQuizForm";
import { getQuizSetById } from "../api/quiz-set";
import QuizCardActions from "../components/QuizCardActions";

export default function EditQuizSet() {
  const [quizSet, setQuizSet] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getQuizSetById(id);
      setQuizSet(data);
    }
    fetchData();
  }, [id]);

  const handleQuizsets = (updateValue) => {
    setQuizSet((prev) => ({
      ...prev,
      ...updateValue,
      questions: updateValue.questions
        ? mergeQuestions(prev.questions || [], updateValue.questions)
        : prev.questions || [],
    }));
  };

  const mergeQuestions = (oldQuestions = [], newQuestions = []) => {
    const map = new Map();
    for (const q of oldQuestions) {
      map.set(q.id, { ...q });
    }
    for (const q of newQuestions) {
      const existing = map.get(q.id);
      map.set(q.id, { ...existing, ...q });
    }
    return Array.from(map.values());
  };

  const handleEditClick = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const clearSelectedQuiz = () => {
    setSelectedQuiz(null);
  };

  if (!quizSet) return null;

  return (
    <>
      {quizSet?.active === false && (
        <Alert variant="warning">
          This quiz is unpublished. It will not be visible in the course.
        </Alert>
      )}
      <Container className="my-4">
        <div className="d-flex justify-content-end mb-3">
          <QuizSetAction
            quizSetId={id}
            isPublished={quizSet.active}
            handleQuizsets={handleQuizsets}
          />
        </div>

        <Row className="mt-4">
          <Col lg={6} className="order-lg-1 order-2 mb-4">
            <h4>Quiz List</h4>
            {quizSet.questions.map((quiz) => (
              <Card key={quiz.id} className="mb-3 shadow-sm border">
                <Card.Body>
                  <Card.Title>{quiz.title}</Card.Title>
                  <Row>
                    {quiz.options.map((option, idx) => (
                      <Col sm={6} key={idx} className="mb-2">
                        <div className="d-flex align-items-center text-muted">
                          {option.is_correct ? (
                            <FaCheckCircle className="me-2 text-success" />
                          ) : (
                            <FaCircle className="me-2" />
                          )}
                          <span>{option.text}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="d-flex justify-content-end mt-3">
                    <QuizCardActions quiz={quiz} quizSetId={id} onEdit={handleEditClick} />
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col lg={6} className="order-lg-2 order-1 mb-4">
            <h4 className="mb-3">Customize your quiz set</h4>
            <div className="mb-4">
              <QuizTitleForm
                initialData={{ title: quizSet.title }}
                quizSetId={id}
                handleQuizsets={handleQuizsets}
              />
            </div>
            <div>
              <AddQuizForm
                quizSetId={id}
                handleQuizsets={handleQuizsets}
                selectedQuiz={selectedQuiz}
                clearSelectedQuiz={clearSelectedQuiz}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
