import { Navigate } from "react-router-dom";
import { QuizColumn } from "./QuizColumn";
import { QuizDataTable } from "./QuizTable";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getQuizSetsByInstructor } from "../api/quiz-set";
const QuizSets = () => {
  const { user } = useAuth();

  if (!user || user.role !== "instructor") {
    return <Navigate to="/" replace />;
  }
  const [listQuizSets, setListQuizSets] = useState([]);
  useEffect(() => {
    async function fetchQuizSets() {
      try {
        const quizsets = await getQuizSetsByInstructor(user.id);
        setListQuizSets(quizsets);
      } catch (e) {
        console.error("Error fetching quiz sets:", e);
      }
    }
    fetchQuizSets();
  }, []);
  

  return (
    <div className="p-4">
      <QuizDataTable columns={QuizColumn} data={mappedQuizSets(listQuizSets)} />
    </div>
  );

  function mappedQuizSets(quizSets) {
    return quizSets.map((quizSet) => ({
      id: quizSet.id,
      title: quizSet.title,
      isPublished: quizSet.active,
      totalQuiz: quizSet?.questions?.length || 0,
    }));
  }
};

export default QuizSets;
