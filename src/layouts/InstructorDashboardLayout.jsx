import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const InstructorDashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div className="d-flex h-100">
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ width: "250px", zIndex: 50 }}
      >
        <Sidebar />
      </div>
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <div
          className="position-fixed w-100"
          style={{ height: "80px", zIndex: 50 }}
        >
          <Navbar />
        </div>
        <main style={{ paddingTop: "80px" }}>
          <div>
            <Outlet />{" "}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboardLayout;
