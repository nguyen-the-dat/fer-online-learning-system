import React from "react";
import { Accordion, Row, Col, Container } from "react-bootstrap";
import { BookCheck, Clock10, Radio } from "lucide-react";
import CourseModuleList from "./CourseModuleList";

const CourseCurriculum = ({ course }) => {
  // const totalDuration = course?.modules
  //   ?.map((item) =>
  //     item.lessonIds.reduce((acc, obj) => acc + (obj.duration || 0), 0)
  //   )
  //   .reduce((acc, obj) => acc + obj, 0);
const totalDuration = 7200;
  return (
    <Container className="mt-4 mb-5">
      <Row className="text-secondary text-center mb-4">
        <Col xs={12} md="auto" className="mb-2">
          <BookCheck size={16} className="me-2" />
          {course?.modules?.length} Chapters
        </Col>
        <Col xs={12} md="auto" className="mb-2">
          <Clock10 size={16} className="me-2" />
          {(totalDuration / 3600).toPrecision(2)}+ Hours
        </Col>
        <Col xs={12} md="auto" className="mb-2">
          <Radio size={16} className="me-2" />
          4 Live Class
        </Col>
      </Row>

      <Accordion defaultActiveKey="0" alwaysOpen>
        {course?.modules?.map((module, index) => (
          <CourseModuleList key={module.id || index} moduleId={module} eventKey={index.toString()} />
        ))}
      </Accordion>
    </Container>
  );
};

export default CourseCurriculum;
