import { Alert } from "react-bootstrap";
import { Row, Col, Button, Container } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import ModuleActions from "../components/ModuleActions";
import { Link, useParams } from "react-router-dom";
import ModuleTitleForm from "../components/ModuleTitleForm";
import { LessonForm } from "../components/LessonForm";
import IconBadge from "../components/IconBadge";
import { LayoutDashboard, BookOpenCheck } from "lucide-react";
import { getModuleDetail } from "../api/modules";
import { useEffect, useState } from "react";
import { getLessonsDetail } from "../api/lessons";
const EditModuleDetailPage = () => {
  const { courseId, moduleId } = useParams();
  const [moduleInfo, setModuleInfo] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  useEffect(() => {
    if (!moduleId) return;

    const getModuleData = async () => {
      try {
        const res = await getModuleDetail(moduleId);
        setModuleInfo(res);
      } catch (err) {
        console.error("Lỗi khi lấy module:", err);
      }
    };

    getModuleData();
  }, [moduleId]);

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonIds = moduleInfo?.lessonIds;

      if (!Array.isArray(lessonIds) || lessonIds.length === 0) {
        setCourseLessons([]);
        return;
      }

      try {
        const fetchedLessons = await Promise.all(
          lessonIds.map((lessonId) => getLessonsDetail(lessonId))
        );
        const sortedLessons = fetchedLessons.sort((a, b) => a.order - b.order);
        setCourseLessons(sortedLessons);
      } catch (error) {
        console.error("Failed to fetch lessons details:", error);
      }
    };

    fetchLessons();
  }, [moduleInfo?.lessonIds]);
  const handleUpdateModule = (updatedValues) => {
    setModuleInfo((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  const handleUpdateLesson = (updateValue) => {
    setCourseLessons((prev) => {
      const index = prev.findIndex((item) => item.id === updateValue.id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...updateValue };
        return updated;
      } else {
        return [...prev, updateValue];
      }
    });
  };

  return (
    <>
      {!moduleInfo?.active && (
        <Alert
          key="warning"
          variant="warning"
          className="d-flex align-items-center  gap-2 rounded-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-exclamation-triangle"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          This module is unpublished. It will not be visible in the course.
        </Alert>
      )}

      <div className="p-4">
        <Row className="align-items-center mb-2">
          <Col>
            <Link
              to={`/dashboard/courses/${courseId}`}
              className="d-inline-flex align-items-center text-decoration-none text-body small"
            >
              <ArrowLeft size={16} className="me-2" />
              Back to course setup
            </Link>
          </Col>
        </Row>

        <Row>
          <Col className="text-end">
            <ModuleActions
              moduleId={moduleId}
              active={moduleInfo?.active}
              onUpdate={handleUpdateModule}
            />
          </Col>
        </Row>
      </div>

      <Container className="mt-5">
        <Row className="g-4">
          <Col xs={12} md={6}>
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="h5 m-0">Customize Your Module</h2>
              </div>
              <ModuleTitleForm
                initialData={{ title: moduleInfo?.title || "" }}
                moduleId={moduleId}
                onUpdate={handleUpdateModule}
              />
            </div>

            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="h5 m-0">Module Lessons</h2>
              </div>
              <LessonForm
                initialData={courseLessons}
                moduleId={moduleId}
                courseId={courseId}
                onUpdate={handleUpdateModule}
                onUpdateLessons={handleUpdateLesson}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditModuleDetailPage;
