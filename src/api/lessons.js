import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export async function getLessonsDetail(lessonId) {
  try {
    const res = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
    return res.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

export async function createLesson(formData) {
  const data = Object.fromEntries(formData.entries());
  const fullLesson = {
    ...data,
    description: "",
    duration: 0,
    video_url: "",
    access: "private",
    active: false,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullLesson),
    });
    if (!res.ok) throw new Error("Failed to save course");

    const newLesson = await res.json();
    return newLesson;
  } catch (error) {
    console.error("[createLesson]", error);
    throw error;
  }
}

export const reorderLessons = async (data) => {
  try {
    const promises = data.map((element) =>
      updateLesson(element.id, { order: element.order })
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Error in reorderLessons:", error);
    throw error;
  }
};

export const updateLesson = async (lessonId, updatedField) => {
  try {
    const res = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedField),
    });

    const updateLesson = await res.json();
    return updateLesson;
  } catch (error) {
    console.error("[updateLesson]", error);
    throw error;
  }
};
// api/lessons.js

export async function fetchLessonsByCourseId(courseId) {
  try {
    const res = await fetch(
      `http://localhost:3001/lessons?courseId=${courseId}&active=true`
    );
    if (!res.ok) throw new Error("Failed to fetch lessons");

    const lessons = await res.json();
    console.log("less", lessons);
    // Sắp xếp theo thứ tự nếu cần
    const sorted = lessons.sort((a, b) => a.order - b.order);
    return sorted;
  } catch (error) {
    console.error("Lỗi khi fetch lessons:", error);
    return [];
  }
}

export async function updateLessonWatch({
  courseId,
  lessonId,
  moduleSlug,
  state,
  userId,
  lastTime = 0,
}) {
  try {
    // 1. Get module by slug
    const moduleRes = await fetch(`${API_BASE_URL}/modules?slug=${moduleSlug}`);
    const module = (await moduleRes.json())[0];
    if (!module) throw new Error("Module not found");

    // 2. Get lesson
    const lessonRes = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
    const lesson = await lessonRes.json();
    if (!lesson) throw new Error("Lesson not found");

    // 3. Check for existing watch entry
    const watchRes = await fetch(
      `${API_BASE_URL}/watches?user=${userId}&lesson=${lessonId}&module=${module.id}`
    );
    const watchData = await watchRes.json();
    const watch = watchData[0];

    const now = Date.now();

    if (state === "started" && !watch) {
      await fetch(`${API_BASE_URL}/watches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          lesson: lessonId,
          module: module.id,
          state: "started",
          lastTime: lastTime,
          created_at: now,
        }),
      });
    }

    if (state === "completed") {
      if (!watch) {
        await fetch(`${API_BASE_URL}/watches`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userId,
            lesson: lessonId,
            module: module.id,
            state: "completed",
            lastTime: lastTime,
            created_at: now,
          }),
        });
      } else if (watch.state === "started") {
        await fetch(`${API_BASE_URL}/watches/${watch.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: "completed",
            modified_at: now,
          }),
        });
      }
    }

    return "Watch entry updated successfully";
  } catch (error) {
    console.error("updateLessonWatch error:", error.message);
    throw error;
  }
}

export async function getLessonById(id) {
  try {
    const lessonDetail = await fetch(
      `${API_BASE_URL}/lessons/${id}?active=true`
    );
    const data = await lessonDetail.json();
    return data;
  } catch (error) {
    console.error("get lesson detail error:", error.message);
    throw error;
  }
}
