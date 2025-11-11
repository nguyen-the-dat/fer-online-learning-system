const API_BASE_URL = "http://localhost:3001";

export const createNewTestimonials = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create testimonial");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return null;
  }
};


export const hasReviewed = async (userId, courseId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/testimonials?userId=${userId}&courseId=${courseId}`
    );
    const data = await res.json();
    return data.length > 0;
  } catch (error) {
    console.error("Error checking testimonial:", error);
    return false;
  }
};

export const getTestimonialsByCourseId = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials?courseId=${courseId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    const testimonials = await response.json();
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials by courseId:", error);
    return [];
  }
};

