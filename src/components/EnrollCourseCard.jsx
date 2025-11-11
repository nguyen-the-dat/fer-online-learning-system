import React from "react";
import { Card, Badge, ProgressBar, Row, Col } from "react-bootstrap";
// import { BookOpen } from "react-feather";
// import courseThumbnail from "../assets/course-thumbnail.jpg"; 

const EnrollCourseCard = ({enrollcourseData}) => {
  // Fake dữ liệu tạm thời
  const enrollcourse = {
    course: {
      title: "Introduction to React",
      thumbnail: "",
      modules: new Array(10).fill({}), // 10 modules
    },
    student: "student_id_123",
  };

  const totalCompletedModules = 2;
  const totalModuleCount = enrollcourseData.course.modules.length;
  const totalProgress = (totalCompletedModules / totalModuleCount) * 100;

  const totalQuizzes = 5;
  const quizzesTaken = 3;
  const marksFromQuizzes = 15;
  const otherMarks = 10;
  const totalMarks = marksFromQuizzes + otherMarks;

  const courseCategory = { title: "Web Development" };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src= {enrollcourseData?.course?.thumbnail}
        alt="Course Thumbnail"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="mb-1"> {enrollcourseData?.course?.title}</Card.Title>
        <div className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
         {enrollcourseData?.course?.category?.title}
        </div>

        <div className="d-flex align-items-center mb-3 text-secondary">
          {/* <BookOpen size={16} className="me-1" /> */}
          <span>{totalModuleCount} Chapters</span>
        </div>

        <hr />

        <div className="mb-2 d-flex justify-content-between">
          <span>Total Modules:</span>
          <span>{totalModuleCount}</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>
            Completed Modules:{" "}
            <Badge bg="success">{totalCompletedModules}</Badge>
          </span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Total Quizzes:</span>
          <span>{totalQuizzes}</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>
            Quiz Taken: <Badge bg="success">{quizzesTaken}</Badge>
          </span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Mark from Quizzes:</span>
          <span>{marksFromQuizzes}</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Others:</span>
          <span>{otherMarks}</span>
        </div>

        <hr />

        <div className="mb-3 d-flex justify-content-between">
          <strong>Total Marks:</strong>
          <strong>{totalMarks}</strong>
        </div>

        <ProgressBar
          now={totalProgress}
          label={`${Math.round(totalProgress)}%`}
          variant={totalProgress === 100 ? "success" : "info"}
          style={{ height: "20px" }}
        />
      </Card.Body>
    </Card>
  );
};

export default EnrollCourseCard;