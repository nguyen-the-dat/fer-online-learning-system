import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetailsIntro from "../components/CourseDetailsIntro";
import CourseDetails from "../components/CourseDetails";
import { fetchCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";
import { getTestimonialsByCourseId } from "../api/testimonials";
import Testimonials from "../components/Testimonials";
import RelatedCourses from "../components/RelatedCourse";

export const SingleCoursePage = () => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [hasEnrollment, setHasEnrollment] = useState(false);
  const [testimonialList, setTestimonialList] = useState([]);
  const [isInstructor, setIsInstructor] = useState(false);

  const params = useParams();
  const courseId = params.id;
  const { user } = useAuth();

  useEffect(() => {
    async function getCourseDetailAndTestimonials() {
      try {
        const course = await fetchCourseById(courseId);
        setCourseDetail(course);

        const testimonials = await getTestimonialsByCourseId(courseId);
        setTestimonialList(testimonials);

        if (user && course?.instructor?.id === user.id) {
          setIsInstructor(true);
        } else {
          setIsInstructor(false);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khoá học hoặc testimonials:", error);
      }
    }

    if (user && courseId) {
      getCourseDetailAndTestimonials();
    }
  }, [courseId, user]);

  useEffect(() => {
    async function checkEnroll() {
      try {
        if (!courseDetail || !user || isInstructor) return;

        const res = await fetch(`http://localhost:3001/enrollments`);
        const enrollments = await res.json();

        const matched = enrollments.find(
          (e) =>
            e.userId === Number(user.id) &&
            e.courseId === Number(courseId) &&
            e.status === "PAID"
        );

        setHasEnrollment(!!matched);
      } catch (error) {
        console.error("Lỗi khi kiểm tra enrollments:", error);
      }
    }

    checkEnroll();
  }, [courseDetail, user, courseId, isInstructor]);

  return (
    <>
      <CourseDetailsIntro
        course={courseDetail}
        hasEnrollment={hasEnrollment}
        isInstructor={isInstructor}
      />
      <CourseDetails course={courseDetail} />

      {testimonialList?.length > 0 && (
        <Testimonials testimonials={testimonialList} />
      )}

      <RelatedCourses />
    </>
  );
};
