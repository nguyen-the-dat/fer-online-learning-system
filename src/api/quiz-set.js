const API_BASE_URL = "http://localhost:3001";
import { getSlug } from "../../lib/convert-data";
export async function createQuizSet(data) {
  console.log("Creating quiz set with data:", data);
  const response = await fetch(`${API_BASE_URL}/quiz-sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create quiz set");
  }

  return response.json();
}

export async function getQuizSetsByInstructor(instructorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/quiz-sets?instructorId=${instructorId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quiz sets");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz sets:", error);
    throw error;
  }
}

export async function getQuizSetById(quizSetId) {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz-sets/${quizSetId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch quiz set");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz set:", error);
    throw error;
  }
}

export async function updateQuizSet(quizSetId, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz-sets/${quizSetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update quiz set");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating quiz set:", error);
    throw error;
  }
}

export async function addQuestionToQuizSet(quizSetId, submittedValue) {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz-sets/${quizSetId}`);
    if (!res.ok) throw new Error("Quiz set not found");

    const quizSet = await res.json();

    const newQuestion = {
      id: Date.now(),
      title: submittedValue.title,
      description: submittedValue.description,
      options: [
        {
          text: submittedValue.optionA.label,
          is_correct: submittedValue.optionA.isTrue,
        },
        {
          text: submittedValue.optionB.label,
          is_correct: submittedValue.optionB.isTrue,
        },
        {
          text: submittedValue.optionC.label,
          is_correct: submittedValue.optionC.isTrue,
        },
        {
          text: submittedValue.optionD.label,
          is_correct: submittedValue.optionD.isTrue,
        },
      ],
      explanations: "",
      mark: 5,
      slug: getSlug(submittedValue.title),
    };

    const updatedQuestions = [...(quizSet.questions || []), newQuestion];

    const patchRes = await updateQuizSet(quizSetId, {
      questions: updatedQuestions,
    });

    return patchRes;
  } catch (error) {
    console.error("Error adding question to quiz set:", error);
    throw error;
  }
}

export async function getAllActiveQuizSetsByInstructorId(instructorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/quiz-sets?instructorId=${instructorId}&active=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch active quiz sets");
    }

    const data = await response.json();
    console.log('Active quiz sets:', data);
    return data;
  } catch (error) {
    console.error("Error fetching active quiz sets:", error);
    throw error;
  }
}
