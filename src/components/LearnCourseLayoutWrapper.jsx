import { useParams } from "react-router-dom";
import LearnCourseLayout from "../layouts/LearnCourseLayout";
import LessonPage from "../pages/LessonPage";
import { ProgressProvider } from "../context/ProgressContext";

const LearnCourseLayoutWrapper = () => {
  const { courseId } = useParams();
  return (
    <ProgressProvider>
      <LearnCourseLayout courseId={courseId}>
        <LessonPage />
      </LearnCourseLayout>
    </ProgressProvider>
  );
};

export default LearnCourseLayoutWrapper;
