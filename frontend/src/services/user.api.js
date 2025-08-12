import API_ENDPOINTS from "../config/api";

const API_URL = API_ENDPOINTS.USER;

export async function updateUser(userData) {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (
      !response.ok &&
      response.status !== 401 &&
      response.status !== 404 &&
      response.status !== 400
    ) {
      return { success: false, message: data.message || "Failed to update name" };
    }

    return {
      success: true,
      message: data.message || "Name updated successfully",
      user: data.user,
    };
  } catch (error) {
    console.error("Error updating name:", error);
    return { success: false, message: error.message || "An error occurred while updating name" };
  }
}
