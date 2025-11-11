import React from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";

const CourseOverview = ({ course }) => {
  return (
    <>
      <h3 className="h4">Course Description</h3>
      <p className="mt-3">{course?.description}</p>

      <Card className="mt-4 bg-light p-4">
        <h4 className="h5 mb-4">What You Will Learn?</h4>
        <Row>
          {course?.learning?.map((learn, index) => (
            <Col key={index} xs={12} sm={6} className="mb-3 d-flex align-items-start">
              <BsCheck2Circle size={20} className="me-2 text-success mt-1" />
              <span>{learn}</span>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default CourseOverview;
