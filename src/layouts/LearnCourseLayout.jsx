import CourseSidebar from "../components/CourseSidebar";
const LearnCourseLayout = ({ children, courseId }) => {
  return (
    <div className="container-fluid p-0">
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-2 bg-light border-end p-0">
          <CourseSidebar courseId={courseId} />
        </div>

        <div className="col-10 px-4 py-3">{children}</div>
      </div>
    </div>
  );
};

export default LearnCourseLayout;
