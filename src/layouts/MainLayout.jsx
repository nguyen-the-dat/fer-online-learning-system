// src/layouts/MainLayout.jsx
import React from "react";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
import {SiteFooter} from "../components/SiteFooter";
const navLinks = [
  { title: "Features", href: "/#features" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Blogs", href: "/#blogs" },
  { title: "Documentation", href: "/#documentation" },
];
const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header
        className="fixed-top bg-light border-bottom"
        style={{ zIndex: 1040 }}
      >
        <div
          className="container d-flex align-items-center justify-content-between py-3"
          style={{ height: "80px" }}
        >
          <MainNav items={navLinks} />
        </div>
      </header>

      <main className="flex-grow-1" style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>

       {/* Footer Section */}
      <SiteFooter/>
    </div>
  );
};

export default MainLayout;
