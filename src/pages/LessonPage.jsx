import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import LessonVideo from "./LessonVideo";
// import VideoDescription from "./VideoDescription";
// import { Separator } from "./ui/Separator"; // nếu bạn có separator
import { fetchLessonsByCourseId } from "../api/lessons";
import { Container, Row, Col } from "react-bootstrap";
import { LessonVideo } from "../components/LessonVideo";
import VideoDescription from "../components/VideoDescription";
const LessonPage = ({ setProgress }) => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const moduleSlug = searchParams.get("module");

  const [lessons, setLessons] = useState([]);
  const [lessonToPlay, setLessonToPlay] = useState(null);

  useEffect(() => {
    async function loadLessons() {
      try {
        const data = await fetchLessonsByCourseId(courseId);
        const sorted = data.sort((a, b) => a.order - b.order);
        setLessons(sorted);

        const selected = sorted.find((lesson) => lesson.slug === name);
        setLessonToPlay(selected || sorted[0]);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bài học:", err);
      }
    }

    if (courseId) {
      loadLessons();
    }
  }, [courseId, name]);

  if (!lessonToPlay) return <div>Đang tải...</div>;

  return (
    <Container className="pb-5">
      <Row className="mb-4">
        <Col>
          <LessonVideo
            courseId={courseId}
            lesson={lessonToPlay}
            module={moduleSlug}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h2 className="h4 fw-semibold mb-3">{lessonToPlay?.title}</h2>
          <hr />
          <VideoDescription description={lessonToPlay?.description} />
        </Col>
      </Row>
    </Container>
  );
};

export default LessonPage;
