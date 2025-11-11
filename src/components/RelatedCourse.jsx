import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { BookOpen, ArrowRight } from "lucide-react";
import { formatPrice } from "../../lib/formatPrice";

const courses = [
  {
    id: 3,
    title: "Design",
    thumbnail: "/assets/images/courses/course_1.png",
  },
  {
    id: 4,
    title: "Development",
    thumbnail: "/assets/images/courses/python_thumbnail.png",
  },
 
];

const RelatedCourses = () => {
  return (
    <section className="py-4">
      <Container>
        <h3 className="mb-4">Related Courses</h3>
        <Row className="g-4">
          {courses.map((course) => (
            <Col key={course.id} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <div
                  style={{
                    height: "200px",
                    backgroundImage: `url(${course.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">
                    Reactive Accelerator
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {course.title}
                  </Card.Subtitle>
                  <div className="d-flex align-items-center mb-2 text-secondary">
                    <BookOpen size={16} className="me-2" />
                    <span>4 Chapters</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{formatPrice(49)}</strong>
                    <Button variant="link" size="sm">
                      Enroll <ArrowRight size={14} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RelatedCourses;
