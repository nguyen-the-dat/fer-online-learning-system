import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchCourses = async () => {
  const res = await axios.get(`${API_BASE_URL}/courses?active=true`);
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/courses/${id}?active=true`);
  return res.data;
};

export const createCourse = async (course, instructorInfo, category) => {
  try {
    const fullCourse = {
      ...course,
      active: false,
      price: 0,
      instructor: instructorInfo,
      category: category,
      modules: [],
      testimonials: [],
    };

    const res = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullCourse),
    });

    if (!res.ok) throw new Error("Failed to save course");

    const newCourse = await res.json();
    return newCourse;
  } catch (error) {
    console.error("[createCourse]", error);
    throw error;
  }
};

export const updateCourse = async (courseId, updatedFields) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    const updatedCourse = await res.json();
    return updatedCourse;
  } catch (error) {
    console.error("[updateCourse]", error);
    throw error;
  }
};

// const updatedFields = {
//   title: "Master Python - Updated",
//   price: 19.99,
//   thumbnail: "new_thumbnail.png",
// };

// updateCourse(1, updatedFields)
//   .then((course) => console.log("Updated:", course))
//   .catch((err) => console.error(err));

export const getCoursesByInstructorId = async (instructorId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/courses?instructor.id=${instructorId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses by instructor:", error);
    return [];
  }
};
