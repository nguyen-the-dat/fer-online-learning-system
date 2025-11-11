import React, { useEffect, useState } from "react";
import { Accordion, Card, Spinner } from "react-bootstrap";
import { Video, FileQuestion, Radio } from "lucide-react";
import CourseLessonList from "./CourseLessonList";

const CourseModuleList = ({ moduleId, eventKey }) => {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`http://localhost:3001/modules/${moduleId}`);

        const data = await response.json();
        console.log('data', data);
        setModule(data);
      } catch (error) { 
        console.error("Lỗi khi lấy module:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

  if (loading) {
    return (
      <Card className="mb-2 border-0">
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>Loading...</Accordion.Header>
          <Accordion.Body className="text-center">
            <Spinner animation="border" size="sm" />
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    );
  }

  if (!module) return null;

  const totalDuration = module.lessonIds?.reduce(
    (acc, obj) => acc + (obj.duration || 0),
    0
  );

  return (
    <Card className="mb-2 border-0">
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{module.title}</Accordion.Header>
        <Accordion.Body>
          <div className="mb-3 text-secondary d-flex flex-wrap gap-3">
            <div>
              <Video size={16} className="me-2" />
              {(totalDuration / 3600).toPrecision(2)}+ Hours
            </div>
            <div>
              <FileQuestion size={16} className="me-2" />
              10 Quiz
            </div>
            <div>
              <Radio size={16} className="me-2" />
              1 Live Class
            </div>
          </div>

          <div>
            {module.lessonIds?.map((lesson) => (
              <CourseLessonList key={lesson.id} lessonId={lesson} />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  );
};

export default CourseModuleList;
