import React, { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { BsPersonVideo, BsPeople, BsChatDots, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom"; // dùng react-router-dom thay vì next/link
// import { getCourseDetailsByInStructor } from "@/queries/instructor"; // Giữ nguyên nếu dùng được

const CourseInstructor = ({ course }) => {
  //   const [courseDetailByInstructor, setCourseDetailByInstructor] = useState({});

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await getCourseDetailsByInStructor(course?.instructor?._id);
  //       setCourseDetailByInstructor(result);
  //     };
  //     fetchData();
  //   }, [course]);

  const courseDetailByInstructor = {
    course: 3,
    enrollments: 6,
    reviews: 3,
    ratings: "4.7",
    inscourses: [
      {
        id: "6648184a6fe803e9128d7fba",
        title: "Learn Python",
        description:
          "Learn Python programming language from scratch with hands-on exercises.",
        thumbnail: "python_thumbnail.png",
        modules: [],
        price: 29.99,
        active: true,
        category: {},
        instructor: {},
        __v: 3,
        testimonials: [],
        quizSet: "663a096ebfe65e5778eedf4a",
        subtitle: "Learn Python Like a Pro",
        learning: [],
        createdOn: "2024-02-12T00:00:00.000Z",
        modifiedOn: "2024-02-12T00:00:00.000Z",
      },
      {
        _id: "664aca881387e2ad2e8be484",
        title: "Mastering JavaScript updated",
        description:
          "Learn JavaScript fundamentals from scratch with hands-on exercises updated description",
        thumbnail: "learn_js_thumbnail.jpeg",
        modules: [],
        price: 56,
        active: true,
        category: {},
        instructor: {},
        __v: 0,
        testimonials: [],
        quizSet: "663a096ebfe65e5778eedf4a",
        subtitle: "Learn Javascript from the scratch",
        learning: [],
        createdOn: "2024-02-12T00:00:00.000Z",
        modifiedOn: "2024-02-12T00:00:00.000Z",
      },
      {
        _id: "68490efaef9e39476eb18895",
        title: "Next.js 15 Full Stack Complete Learning Management System",
        subtitle: "subtitle",
        description:
          "Next.js 15 Mastery: Build a Modern Learning Management System from Scratch Create a Scalable Full-Stack LMS with Next.js\n",
        modules: [],
        price: 23,
        active: true,
        instructor: {},
        testimonials: [],
        learning: [],
        createdOn: "2024-02-12T00:00:00.000Z",
        modifiedOn: "2024-02-12T00:00:00.000Z",
        __v: 3,
        thumbnail: "Screenshot 2025-06-11 120734.png",
        category: {},
        quizSet: "663a096ebfe65e5778eedf4c",
      },
    ],
    revenue: 250.98,
    fullInsName: "Pter Josh Does",
    designation: "",
    bio: "",
    insImage: "https://i.pravatar.cc",
  };

  return (
    <Card className="bg-light p-4 border-0 shadow-sm">
      <Row className="align-items-start mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Image
            src={course?.instructor?.profilePicture}
            alt="Instructor"
            rounded
            fluid
            style={{ height: "310px", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <h3 className="fw-bold">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </h3>
          <p className="text-muted mb-4">{course?.instructor?.designation}</p>

          <ul className="list-unstyled">
            <li className="d-flex align-items-center gap-2 mb-2">
              <BsPersonVideo className="text-secondary" />
              {courseDetailByInstructor?.course} Courses
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <BsPeople className="text-secondary" />
              {courseDetailByInstructor?.enrollments}+ Student Learned
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <BsChatDots className="text-secondary" />
              {courseDetailByInstructor?.reviews} Reviews
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <BsStar className="text-secondary" />
              {courseDetailByInstructor?.ratings} Average Rating
            </li>
          </ul>
        </Col>
      </Row>
      <p className="text-muted">{course?.instructor?.bio}</p>
    </Card>
  );
};

export default CourseInstructor;
