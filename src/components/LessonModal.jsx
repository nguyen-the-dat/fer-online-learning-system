import { useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  CloseButton,
} from "react-bootstrap";
import { ArrowLeft, LayoutDashboard, Eye, Video } from "lucide-react";

import { LessonTitleForm } from "./LessonTitleForm";
import { LessonDescriptionForm } from "./LessonDescriptionForm";
import { LessonAccessForm } from "./LessonAccessForm";
import { VideoUrlForm } from "./VideoUrlForm";
import LessonActions from "./LessonAction";

// IconBadge tự xây hoặc thay bằng <div className="d-flex align-items-center">Icon + Title</div>
const IconBadge = ({ icon: Icon }) => (
  <div className="d-inline-flex align-items-center justify-content-center bg-secondary-subtle rounded p-2 me-2">
    <Icon size={18} />
  </div>
);

export const LessonModal = ({
  open,
  setOpen,
  courseId,
  lesson,
  moduleId,
  listLessons,
  setListLessons,
  updateListLesson,
}) => {
  function postDelete() {
    setOpen(false);
  }


  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      size="xl"
      scrollable
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Lesson Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <Container fluid>
          <Row>
            <Col>
              <Button
                variant="link"
                className="p-0 d-inline-flex align-items-center mb-3"
                onClick={() => {
                  window.location.href = `/dashboard/courses/${courseId}`;
                }}
              >
                <ArrowLeft size={16} className="me-2" />
                Back to course setup
              </Button>
              <div className="d-flex justify-content-end">
                <LessonActions
                  lessonId={lesson?.id}
                  active={lesson?.active}
                  updateListLesson={updateListLesson}
                />
                {/* lessonId, active, onUpdate */}
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h5 className="mb-0">Customize Your Chapter</h5>
                </div>
                <LessonTitleForm
                  initialData={{ title: lesson?.title }}
                  courseId={courseId}
                  lessonId={lesson?.id}
                  updateListLesson={updateListLesson}
                />
                <LessonDescriptionForm
                  initialData={{ description: lesson?.description }}
                  courseId={courseId}
                  lessonId={lesson?.id}
                  updateListLesson={updateListLesson}
                />
              </div>
              <div>
                <div className="d-flex align-items-center mb-2">
                  <IconBadge icon={Eye} />
                  <h5 className="mb-0">Access Settings</h5>
                </div>
                <LessonAccessForm
                  initialData={{ isFree: lesson?.access !== "private" }}
                  courseId={courseId}
                  lessonId={lesson?.id}
                  updateListLesson={updateListLesson}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex align-items-center mb-2">
                <IconBadge icon={Video} />
                <h5 className="mb-0">Add a Video</h5>
              </div>
              <VideoUrlForm
                initialData={{
                  url: lesson?.video_url || "",
                  duration: lesson?.duration,
                  playbackId: lesson?.playbackId,
                }}
                courseId={courseId}
                lessonId={lesson?.id}
                updateListLesson={updateListLesson}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
