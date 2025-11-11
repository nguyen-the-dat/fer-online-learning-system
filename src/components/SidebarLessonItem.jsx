import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

export const SidebarLessonItem = ({ courseId, lesson, module }) => {
  const linkTarget = `/courses/${courseId}/lesson?name=${lesson.slug}&module=${module}`;

  return (
    <Link
      to={linkTarget}
      className="d-flex align-items-center mb-2 text-decoration-none text-dark fw-medium hover-opacity"
    >
      <PlayCircle size={16} className="me-2 text-primary" />
      <span>{lesson.title}</span>
    </Link>
  );
};
