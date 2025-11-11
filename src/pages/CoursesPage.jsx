import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { getCourseList } from '../api/course';
import CourseCard from "../components/CourseCard";
import SearchCourse from "../components/SearchCourse";
import SortCourse from "../components/SortCourse";
import FilterCourse from "../components/FilterCourse";
import FilterCourseMobile from "../components/FilterCourseMobile";
import ActiveFilters from "../components/ActiveFilters";
import { fetchCourses } from "../api/courses";
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      const courseData = await fetchCourses();
      setCourses(courseData);
    };
    fetchCoursesData();
  }, []);

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="align-items-end border-bottom pb-4 mb-4">
        <Col xs={12} lg={6} className="mb-3 mb-lg-0">
          <SearchCourse />
        </Col>
        <Col xs={12} lg={6} className="d-flex justify-content-end gap-2">
          <SortCourse />
          <FilterCourseMobile />
        </Col>
      </Row>

      {/* Active Filters */}
      <Row className="mb-4">
        <Col>
          <ActiveFilters
            filter={{
              categories: ["development"],
              price: ["free"],
              sort: "",
            }}
          />
        </Col>
      </Row>

      {/* Main content */}
      <Row>
        {/* Filters */}
        <Col lg={3} className="mb-4 mb-lg-0">
          <FilterCourse />
        </Col>

        {/* Courses grid */}
        <Col lg={9}>
          <Row className="g-4">
            {courses.map((course) => (
              <Col key={course.id} sm={6} md={6} lg={4}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursesPage;
