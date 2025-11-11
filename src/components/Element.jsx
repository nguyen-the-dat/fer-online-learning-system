import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchCategories } from "../api/categories";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../api/courses";
import CourseCard from "./CourseCard";
import Support from "./Support";
const Element = () => {
  const [categories, setCategories] = useState([]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, coursesData] = await Promise.all([
          fetchCategories(),
          fetchCourses(),
        ]);

        setCategories(categoriesData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-white">
        {/* Outstanding feature 1 */}
        <div className="bg-warning-subtle py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                <h5 className="text-primary fw-semibold mb-2">
                  Fast-track your learning
                </h5>
                <h2 className="text-dark fw-bold display-5 mb-3">
                  Learn By Doing
                </h2>
                <p className="text-secondary">
                  Learn programming skills, from absolute beginner to advanced
                  mastery. We try to create project-based courses that help you
                  learn professionally and make you feel like a complete
                  developer.
                </p>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src="/assets/images/two.png"
                  alt="Learning by doing"
                  className="img-fluid rounded"
                  style={{ maxWidth: "500px", height: "auto" }}
                />
              </Col>
            </Row>
          </Container>
        </div>

        {/* Outstanding feature 2 */}
        <div className="bg-info bg-opacity-10 py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center mb-4 mb-md-0">
                <img
                  src="/assets/images/one.png"
                  alt="Put your learning"
                  className="img-fluid rounded"
                  style={{ maxWidth: "500px", height: "auto" }}
                />
              </Col>
              <Col md={6} className="text-center text-md-start">
                <h5 className="text-success fw-semibold mb-2">
                  Fast-track your learning
                </h5>
                <h2 className="text-dark fw-bold display-5 mb-3">
                  Put Your Learning <br /> Into Practice
                </h2>
                <p className="text-secondary">
                  Apply your learning with real-world projects and learn
                  everything you need to take your career to the next level.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* categories section */}
      <section id="categories" className="container py-5 py-md-5 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">Categories</h2>

          <Link
            href={""}
            className="text-decoration-none text-body d-flex align-items-center gap-1 small fw-medium"
          >
            Browse All <i class="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="row g-3 justify-content-center">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-xxl-3" key={category.id}>
              <Link
                to={`/categories/${category.id}`}
                className="text-decoration-none"
              >
                <div className="card h-100 border rounded-lg text-center p-3 transition-transform hover-transform">
                  <img
                    src={`/assets/images/categories/${category.thumbnail}`}
                    alt={category.title}
                    width={100}
                    height={100}
                    className="mx-auto mb-3"
                  />
                  <h5 className="fw-bold text-dark">{category.title}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* courses section */}
      {/* Courses */}
      <section id="courses" className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4">Courses</h2>
          <a
            href="/courses"
            className="text-decoration-none d-flex align-items-center gap-1"
          >
            Browse All <i className="bi bi-arrow-right-short fs-5 ms-1"></i>
          </a>
        </div>

        <div className="row g-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="col-sm-6 col-md-6 col-lg-4 col-xl-3"
            >
            <CourseCard course={course}/>
              {/* <CourseCard course={course} /> */}
            </div>
          ))}
        </div>
      </section>

      {/* support section */}
      <Support/>

     
    </>
  );
};

export default Element;
