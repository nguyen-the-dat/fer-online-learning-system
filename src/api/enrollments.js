const API_BASE_URL = "http://localhost:3001";

export async function getEnrollmentsByUserId(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/enrollments?userId=${userId}&_expand=course`);
    if (!res.ok) {
      throw new Error("Failed to fetch enrollments");
    }
    const data = await res.json();
    console.log("data from getEnrollmentsByUserId", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
