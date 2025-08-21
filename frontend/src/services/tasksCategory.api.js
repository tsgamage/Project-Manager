import API_ENDPOINTS from "../config/api.js";
import responseNotOkay from "../util/responseNotOkay.js";

const { CATEGORY } = API_ENDPOINTS;

export async function getTasksCategoriesRequest() {
  try {
    const response = await fetch(`${CATEGORY}/tasks`, {
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to fetch tasks categories" };
    }
    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch tasks categories" };
  }
}

export async function createTaskCategoryRequest(category) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to create tasks category" };
    }
    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to create tasks category" };
  }
}

export async function deleteTaskCategoryRequest(categoryID) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/${categoryID}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to delete tasks category" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to delete tasks category" };
  }
}

export async function updateTaskCategoryRequest(categoryID, category) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/${categoryID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to update tasks category" };
    }
    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to update tasks category" };
  }
}
