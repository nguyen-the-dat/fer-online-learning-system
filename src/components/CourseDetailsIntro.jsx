import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../lib/formatPrice";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const CourseDetailsIntro = ({ course, hasEnrollment, isInstructor }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      if (!user) {
        toast.error("Please login before buy the course!");
        return navigate("/login");
      }

      const orderCode = Date.now();
      const description = `course_${course?.id}_user_${user.id}`;
      const amount = course?.price;

      const paymentRes = await fetch("http://localhost:3005/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode,
          description,
          amount,
        }),
      });

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData?.data) {
        throw new Error("Lỗi tạo thanh toán");
      }

      const enrollmentRes = await fetch("http://localhost:3001/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          courseId: course?.id,
          createdAt: new Date().toISOString(),
          status: "pending",
          orderCode: orderCode,
          customerInfo: user.name,
        }),
      });

      if (!enrollmentRes.ok) {
        throw new Error("Không thể tạo bản ghi enrollment");
      }

      window.location.href = paymentData.data.checkoutUrl;
    } catch (error) {
      alert("Lỗi khi enroll: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h5 className="text-muted">{course?.subtitle}</h5>
            <h1 className="display-4 fw-bold">{course?.title}</h1>

            <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">
              {hasEnrollment ? (
                <Link to={`/courses/${course?.id}/lesson`}>
                  <Button size="lg" variant="primary">
                    Access Course
                  </Button>
                </Link>
              ) : (
                !isInstructor && (
                  <Button size="lg" variant="success" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )
              )}

              <Button size="lg" variant="outline-secondary">
                See Intro
              </Button>

              <Button size="lg" variant="danger">
                Price {formatPrice(course?.price)}
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8}>
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="img-fluid rounded d-block mx-auto"
              width={768}
              height={463}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseDetailsIntro;
