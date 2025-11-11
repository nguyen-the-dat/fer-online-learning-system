import React from "react";
import { Container, Row, Col, Badge, Tab, Tabs } from "react-bootstrap";
import CourseOverview from "./CourseOverview.jsx";
import CourseCurriculum from "./CourseCurriculum";
import CourseInstructor from "./CourseInstructor";
import { formatMyDate } from "../../lib/date";
const CourseDetails = ({ course }) => {
  const lastModifiedDate = formatMyDate(course?.modifiedOn);

  return (
    <section className="py-5">
      <Container>
        <Badge bg="success" className="mb-3">{course?.category?.title}</Badge>

        <h3 className="fw-bold display-6">{course?.title}</h3>
        <p className="text-muted">{course?.subtitle}</p>

        {/* Instructor + Last Modified */}
        <Row className="align-items-center mt-4 mb-4">
          <Col xs={12} md={6} className="d-flex align-items-center gap-2 mb-3 mb-md-0">
            <img
              src={course?.instructor?.profilePicture}
              alt={course?.instructor?.firstName}
              roundedCircle
              width={40}
              height={40}
            />
            <p className="mb-0 fw-bold">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-muted">
            <small><strong className="text-success">Last Updated:</strong> {lastModifiedDate}</small>
          </Col>
        </Row>

        {/* Tabs */}
        <Tabs defaultActiveKey="overview" className="mb-3">
          <Tab eventKey="overview" title="Overview">
            <CourseOverview course={course} />
          </Tab>
          <Tab eventKey="curriculum" title="Curriculum">
            <CourseCurriculum course={course} />
          </Tab>
          <Tab eventKey="instructor" title="Instructor">
            <CourseInstructor course={course} />
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default CourseDetails;
