import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Tv } from "lucide-react";
// import { getLesson } from "@/queries/lessons"; // Giữ nguyên nếu bạn đã dùng path alias, nếu không thì sửa lại path
import {getLessonById} from "../api/lessons"
const CourseLessonList = ({ lessonId }) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const result = await getLessonById(lessonId);
      setLesson(result);
    };
    fetchLesson();
  }, [lessonId]);

  if (!lesson) return null;

  return (
    <Button
      variant="light"
      className="d-flex align-items-center justify-content-start w-100 mb-2 text-secondary"
      style={{ fontWeight: 500 }}
    >
      <Tv size={16} className="me-2 text-secondary" />
      {lesson?.title}
    </Button>
  );
};

export default CourseLessonList;
