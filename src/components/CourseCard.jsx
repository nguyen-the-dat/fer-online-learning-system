import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/formatPrice";

const CourseCard = ({ course }) => {
  return (
    <div className="card h-100 border rounded shadow-sm overflow-hidden">
      <Link to={`/courses/${course.id}`} className="text-decoration-none text-dark">
        <div className="ratio ratio-16x9">
          <img
            // src={`/assets/images/courses/${course.thumbnail}`}
            src={`${course.thumbnail}`}
            alt={course.title}
            className="card-img-top object-fit-cover"
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1 text-truncate" title={course.title}>
            {course.title}
          </h5>

          <p className="text-muted small mb-2">
            {course?.category?.title}
          </p>

          <div className="d-flex align-items-center gap-2 text-secondary small mb-2">
            <i className="bi bi-book"></i>
            <span>{course?.modules?.length || 0} Chapters</span>
          </div>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <p className="fw-medium mb-0">{formatPrice(course?.price)}</p>
            {/* <EnrollCourse asLink={true} courseId={course?.id} /> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
