import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import EnrollCourseCard from "./EnrollCourseCard";
import { getEnrollmentsByUserId } from "../api/enrollments";
import { useAuth } from "../context/AuthContext";
const EnrolledCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnrollmentsByUserId(user.id);
        setEnrollments(data);
      } catch (error) {
        console.error("Error loading enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : enrollments.length > 0 ? (
        <Row className="g-4">
          {enrollments.map((enrollment) => (
            <Col key={enrollment.id} sm={12} md={6} lg={4}>
              <Link
                to={`/courses/${enrollment.course.id}/lesson`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EnrollCourseCard
                  enrollcourseData={{
                    id: enrollment.id,
                    student: enrollment.userId,
                    course: {
                      _id: enrollment.course.id,
                      title: enrollment.course.title,
                      category: enrollment.course.category,
                      thumbnail: enrollment.course.thumbnail,
                      modules: enrollment.course.modules,
                    },
                  }}
                />
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="danger" className="fw-bold">
          No Enrollments found!
        </Alert>
      )}
    </Container>
  );
};

export default EnrolledCourses;
