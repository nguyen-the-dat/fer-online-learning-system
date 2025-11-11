// src/api/auth.js

const API_URL = "http://localhost:3001";

export async function registerUser({
  email,
  password,
  firstName,
  lastName,
  role,
}) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName, role }),
    });

    const data = await response.json();
    console.log("Registration response:", data);
    if (!response.ok) {
      throw new Error(data?.message || data || "Registration failed");
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred during registration");
    }
  }
}

export async function createCredentialLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || data || "Login failed");
    }
    console.log("Login response:", data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("An unknown error occurred during login");
    }
  }
}


export async function updateUserByEmail(email, updatedData) {
  try {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    const users = await res.json();

    if (!users.length) {
      throw new Error("User not found");
    }

    const userId = users[0].id;

    const updateRes = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!updateRes.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await updateRes.json();
    return updatedUser;
  } catch (error) {
    console.error("updateUserByEmail error:", error);
    throw error;
  }
}


export async function changePassword({ email, oldPassword, newPassword }) {
  const res = await fetch('http://localhost:3001/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, oldPassword, newPassword }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to change password");
  }

  return result;
}
