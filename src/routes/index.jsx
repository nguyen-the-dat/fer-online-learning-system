import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import CoursePage from "../pages/CoursesPage";
import { SingleCoursePage } from "../pages/SingleCoursePage";
import Profile from "../pages/Profile";
import InstructorDashboardLayout from "../layouts/InstructorDashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import InstructorCoursesPage from "../pages/InstructorCoursesPage";
import AddCourse from "../components/AddCourse";
import EditCourseDetailPage from "../pages/EditCourseDetailPage";
import QuizSets from "../components/QuizSets";
import ProtectedInstructorRoute from "../components/ProtectedInstructorRoute";
import EditModuleDetailPage from "../pages/EditModuleDetailPage";
import EnrollSucess from "../pages/EnrollSuccess";
import ProtectedEnrollmentRoute from "../components/ProtectedEnrollmentRoute";
import LearnCourseLayoutWrapper from "../components/LearnCourseLayoutWrapper";
import AccountLayout from "../layouts/AccountLayout";
import EditProfile from "../pages/Profile";
import EnrolledCourse from "../components/EnrolledCourse";
import EditQuizSet from "../components/EditQuizSet";
import AddQuizSet from "../components/AddQuizSet";

const AppRoutes = () => (
  <Routes>
    {/* Public pages */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/courses/:id" element={<SingleCoursePage />} />
      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<EditProfile />} />
        <Route path="enrolled-courses" element={<EnrolledCourse />} />
      </Route>
      <Route path="/enroll-success" element={<EnrollSucess />} />
      <Route
        path="/courses/:courseId/lesson"
        element={
          <ProtectedEnrollmentRoute>
            <LearnCourseLayoutWrapper />
          </ProtectedEnrollmentRoute>
        }
      />
    </Route>

    {/* Instructor dashboard */}
    <Route path="/dashboard" element={<ProtectedInstructorRoute />}>
      <Route index element={<DashboardPage />} />
      <Route path="courses" element={<InstructorCoursesPage />} />
      <Route path="quiz-sets" element={<QuizSets />} />
      <Route path="quiz-sets/add" element={<AddQuizSet />} />
      <Route path="quiz-sets/:id" element={<EditQuizSet />} />
      <Route path="courses/add" element={<AddCourse />} />
      <Route path="courses/:id" element={<EditCourseDetailPage />} />
      <Route
        path="courses/:courseId/modules/:moduleId"
        element={<EditModuleDetailPage />}
      />
    </Route>

    {/* Auth pages */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register/:role" element={<RegisterPage />} />
  </Routes>
);

export default AppRoutes;
