import { useEffect, useState } from "react";
import { CourseProgress } from "../components/CourseProgress";
import { fetchCourseById } from "../api/courses";
import { SidebarModule } from "../components/SidebarModule";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import GiveReview from "../components/GiveReview";
import DownloadCertificate from "./DownloadCertificate";
import { getQuizSetById } from "../api/quiz-set";
import Quiz  from "../components/Quiz";
const CourseSidebar = ({ courseId }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [modulesWithLessons, setModulesWithLessons] = useState([]);
  const { totalProgress, setTotalProgress } = useProgress();
  const [quizSet, setQuizSet] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    async function getCourseData() {
      try {
        const course = await fetchCourseById(courseId);
        setCourseDetail(course);

        // get all modules of the course
        // Get all modules of the course
        const modulesRes = await fetch(
          `http://localhost:3001/modules?courseId=${courseId}&active=true`
        );
        const modules = await modulesRes.json();

        // Get all lessons
        const lessonsRes = await fetch(
          `http://localhost:3001/lessons?active=true`
        );
        const lessons = await lessonsRes.json();

        // gắn lessons vào module
        const modulesWithLessons = modules
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((module) => {
            const matchedLessons = module.lessonIds
              .map((id) => lessons.find((l) => l.id === id))
              .filter(Boolean)
              .sort((a, b) => Number(a.order) - Number(b.order));
            return { ...module, lessonIds: matchedLessons };
          });

        setModulesWithLessons(modulesWithLessons);

        // calculate progress
        const lessonIdsInCourse = modulesWithLessons.flatMap((module) =>
          module.lessonIds.map((lesson) => lesson.id)
        );
        const totalLessons = lessonIdsInCourse.length;

        const watchesRes = await fetch(
          `http://localhost:3001/watches?user=${user.id}&state=completed`
        );
        const watches = await watchesRes.json();

        const completedLessons = watches.filter((w) =>
          lessonIdsInCourse.includes(w.lesson)
        ).length;

        const progressPercent =
          lessonIdsInCourse.length > 0
            ? Math.round((completedLessons / lessonIdsInCourse.length) * 100)
            : 0;

        setTotalProgress(progressPercent);
        console.log("total lessons:", totalLessons);
        if (course.quizSetId) {
          const quizSetRes = await getQuizSetById(course.quizSetId);
          setQuizSet(quizSetRes);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }

    if (courseId) {
      getCourseData();
    }
  }, [courseId]);

  return (
    <div
      className="d-flex flex-column border-end shadow-sm"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="border-bottom p-4">
        <h5 className="fw-semibold mb-0">{courseDetail?.title}</h5>
        <div className="mt-4">
          <CourseProgress variant="success" value={totalProgress} />
        </div>
      </div>

      <div className="px-3">
        <SidebarModule courseId={courseId} modules={modulesWithLessons} />
      </div>

      <div className="container-fluid pt-4 border-top">
        <div className="px-3 px-lg-5">
          {quizSet && (
            <Quiz
              courseId={courseId}
              quizSet={quizSet}
              isTaken={false}
            />
          )}
        </div>
      </div>

      <div className="px-4 pt-4">
        <GiveReview courseId={courseId} />
        <DownloadCertificate courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseSidebar;
