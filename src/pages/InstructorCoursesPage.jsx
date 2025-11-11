import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { useAuth } from "../context/AuthContext";
import { getCoursesByInstructorId } from "../api/courses";

const InstructorCoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return; // tránh gọi khi user chưa có
      const response = await getCoursesByInstructorId(user.id);
      console.log("Courses fetched:", response);
      setCourses(response);
    };

    fetchData();
  }, [user]);

  return <CourseTable data={courses} />;
};

export default InstructorCoursesPage;
