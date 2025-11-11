import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { updateLessonWatch } from "../api/lessons";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

export const LessonVideo = ({ courseId, lesson, module }) => {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const { user } = useAuth();
  const { setTotalProgress } = useProgress();

  useEffect(() => {
    if (started) {
      updateLessonWatch({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        userId: user.id,
        state: "started",
        lastTime: 0,
      }).then(() => setStarted(false));
    }
  }, [started]);

  useEffect(() => {
    if (ended) {
      updateLessonWatch({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        userId: user.id,
        state: "completed",
        lastTime: duration,
      }).then(() => {
        setEnded(false);
        refetchAndUpdateProgress();
      });
    }
  }, [ended]);

  const refetchAndUpdateProgress = async () => {
    try {
      const [modulesRes, lessonsRes, watchesRes] = await Promise.all([
        fetch(`http://localhost:3001/modules?courseId=${courseId}&active=true`),
        fetch(`http://localhost:3001/lessons?active=true`),
        fetch(`http://localhost:3001/watches?user=${user.id}&state=completed`),
      ]);

      const modules = await modulesRes.json();
      const lessons = await lessonsRes.json();
      const watches = await watchesRes.json();

      const lessonIdsInCourse = modules.flatMap((m) =>
        m.lessonIds.filter((id) => lessons.find((l) => l.id === id))
      );

      const completedLessons = watches.filter((w) =>
        lessonIdsInCourse.includes(w.lesson)
      ).length;

      const progressPercent =
        lessonIdsInCourse.length > 0
          ? Math.round((completedLessons / lessonIdsInCourse.length) * 100)
          : 0;

      setTotalProgress(progressPercent)
    } catch (err) {
      console.error("Lỗi cập nhật progress:", err);
    }
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleEnded = () => {
    setEnded(true);
  };

  const handleDurationChange = (e) => {
    const videoDuration = e.target?.duration;
    if (videoDuration) {
      setDuration(videoDuration);
    }
  };

  if (!lesson.playbackId) {
    return <p className="text-muted">No video available</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <MuxPlayer
        playbackId={lesson.playbackId}
        streamType="on-demand"
        autoPlay={false}
        controls
        onPlay={handleStart}
        onEnded={handleEnded}
        onLoadedMetadata={handleDurationChange}
        style={{ width: "100%", height: "470px" }}
      />
    </div>
  );
};
