import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const createModule = async (formData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const payload = {
      title: data.title,
      slug: data.slug,
      courseId: data.courseId,
      order: data.order,
      lessonIds: [],
      active: false,
      duration: 0,
    };

    const res = await fetch(`${API_BASE_URL}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create module");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating module:", error.message);
    throw error;
  }
};

export const getModuleDetail = async (moduleId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/modules/${moduleId}`);
    return res.data;
  } catch (error) {
    console.error("[getModuleDetail] Failed to fetch module:", error);
    throw error;
  }
};

export const reorderModules = async (data) => {
  try {
    await Promise.all(
      data.map(async (element) => {
        await updateModule(element.id, { order: element.order });
      })
    );
  } catch (error) {
    throw new Error(e);
  }
};

export const updateModule = async (moduleId, updatedField) => {
  try {
    const res = await fetch(`http://localhost:3001/modules/${moduleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedField),
    });

    const updatedModule = await res.json();
    return updatedModule;
  } catch (error) {
    console.error("[updateModule]", error);
    throw error;
  }
};
