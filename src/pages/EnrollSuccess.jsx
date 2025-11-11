import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CheckCircleFill } from "react-bootstrap-icons";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderCode = searchParams.get("orderCode");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [customerInfo, setCustomerInfo] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndCourse = async () => {
      try {
        // 1. Lấy thông tin thanh toán từ JSON Server
        const paymentRecord = await fetch(
          `http://localhost:3001/enrollments?orderCode=${orderCode}`
        );
        const dataResponse = await paymentRecord.json();
        const paymentData = dataResponse[0];

        // 2. Gọi API check trạng thái thanh toán từ server thật
        const res = await fetch(
          `http://localhost:3005/check-payment-status/${orderCode}`
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Lỗi lấy thông tin thanh toán");

        setPaymentStatus(data?.status);
        setCustomerInfo(paymentData?.customerInfo || "Customer");

        // ✅ Nếu thanh toán thành công, cập nhật enrollments
        if (data.status === "PAID" && paymentData?.id) {
          await fetch(`http://localhost:3001/enrollments/${paymentData.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "PAID" }),
          });
        }

        // 3. Lấy thông tin khoá học
        const courseRes = await fetch(
          `http://localhost:3001/courses/${paymentData?.courseId}`
        );
        const courseData = await courseRes.json();
        if (!courseRes.ok) throw new Error("Không tìm thấy khóa học");

        setProductName(courseData.title);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderCode) {
      fetchSessionAndCourse();
    }
  }, [orderCode]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} className="text-center">
          {paymentStatus === "PAID" ? (
            <>
              <CheckCircleFill size={100} color="green" className="mb-4" />
              <h1 className="mb-4">
                Congratulations! <strong>{customerInfo}</strong>, your
                enrollment was successful for <strong>{productName}</strong>.
              </h1>
            </>
          ) : (
            <h1 className="text-danger">Payment failed or not found.</h1>
          )}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/courses">
              <Button size="sm">Browse Courses</Button>
            </Link>
            <Link to={`/courses/${orderCode}/lesson`}>
              <Button variant="outline-secondary" size="sm">
                Play Course
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
