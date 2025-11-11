import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {SidebarLesson} from "./SidebarLesson"
export const SidebarModule = ({ courseId, modules }) => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSlug = searchParams.get("name");

  // Tìm module nào chứa bài học đang được truy cập
  const expandModule = modules.find((module) =>
    module.lessonIds?.some((lesson) => lesson.slug === currentSlug)
  );

  const expandModuleId = expandModule?.id ?? modules[0]?.id;

  return (
    <Accordion defaultActiveKey={expandModuleId?.toString()} alwaysOpen className="w-100 px-3">
      {modules.map((module) => (
        <Accordion.Item eventKey={module.id.toString()} key={module.id}>
          <Accordion.Header>{module.title}</Accordion.Header>
          <Accordion.Body className="pt-2">
            <SidebarLesson
              courseId={courseId}
              lesson={module.lessonIds}
              module={module.slug}
            />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
