import API_ENDPOINTS from "../config/api";
import responseNotOkay from "../util/responseNotOkay";

const API_URL = API_ENDPOINTS.USER;

export async function updateUserRequest(userData) {
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

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to update name" };
    }

    return data;
  } catch (error) {
    return { success: false, message: error.message || "An error occurred while updating name" };
  }
}
