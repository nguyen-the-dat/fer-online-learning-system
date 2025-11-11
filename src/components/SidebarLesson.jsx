import {SidebarLessonItem} from "./SidebarLessonItem"
export const SidebarLesson = ({ courseId, lesson, module }) => {
 
  return (
    <div className="d-flex flex-column w-100 gap-2">
      {lesson.map((lesson) => (
        <SidebarLessonItem
          key={lesson.id}
          courseId={courseId}
          lesson={lesson}
          module={module}
        />
      ))}
    </div>
  );
};
