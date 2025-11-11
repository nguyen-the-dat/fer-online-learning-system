import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { auth } from "../auth"; // Tùy vị trí file auth
// import { getCourseDetailsByInStructor } from "../queries/courses";
// import { getUserByEmail } from "../queries/users";
// import { formatPrice } from "../lib/formatPrice"; // Nếu bạn có sẵn hàm này

const DashboardPage = () => {
  const [courseStatus, setCourseStatus] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const session = await auth();
//       if (!session?.user) {
//         navigate("/login");
//         return;
//       }

//       const instructor = await getUserByEmail(session.user.email);
//       if (instructor?.role !== "instructor") {
//         navigate("/login");
//         return;
//       }

//       const courseStatusData = await getCourseDetailsByInStructor(instructor?.id);
//       setCourseStatus(courseStatusData);
//       setInstructorName(courseStatusData?.fullInsName || "");
//     };

//     fetchData();
//   }, [navigate]);

//   if (!courseStatus) {
//     return <div className="text-center mt-4">Loading...</div>;
//   }

  return (
    <Container className="mt-4">
      <p className="mb-4 text-muted">
        Login as: <strong>DatNTdev</strong>
      </p>
      <Row className="g-4">
        {/* Total Courses */}
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text className="fs-3 fw-bold">9</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Total Enrollments */}
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Enrollments</Card.Title>
              <Card.Text className="fs-3 fw-bold">10000+</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Total Revenue */}
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="fs-3 fw-bold">
              10$
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
