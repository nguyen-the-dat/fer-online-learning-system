import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const ProtectedEnrollmentRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { courseId } = useParams();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await fetch(`http://localhost:3001/enrollments`);
        const enrollments = await res.json();

        const matched = enrollments.find(
          (e) =>
            e.userId === Number(user?.id) &&
            e.courseId === Number(courseId) &&
            e.status === "PAID"
        );

        setIsEnrolled(!!matched);
      } catch (error) {
        console.error("Lỗi khi kiểm tra enrollment:", error);
      } finally {
        setChecking(false);
      }
    };

    if (user && courseId) {
      checkEnrollment();
    }
  }, [user, courseId]);

  if (isLoading || checking) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isEnrolled) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedEnrollmentRoute;
