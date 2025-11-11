import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InstructorDashboardLayout from "../layouts/InstructorDashboardLayout";

const ProtectedInstructorRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Hoặc spinner tùy bạn
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "instructor") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <InstructorDashboardLayout />;
};

export default ProtectedInstructorRoute;
