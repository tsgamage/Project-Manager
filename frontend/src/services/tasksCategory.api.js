import API_ENDPOINTS from "../config/api.js";

const { CATEGORY } = API_ENDPOINTS;

export async function getTasksCategories() {
  try {
    const response = await fetch(`${CATEGORY}/tasks`, {
      credentials: "include",
    });

    if (!response.ok && response.status !== 400 && response.status !== 401) {
      return { success: false, message: "Failed to fetch tasks categories" };
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message || "Failed to fetch tasks categories" };
  }
}

export async function createTaskCategory(category) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    if (!response.ok && response.status !== 400 && response.status !== 401) {
      return { success: false, message: "Failed to create tasks category" };
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message || "Failed to create tasks category" };
  }
}

export async function deleteTaskCategory(categoryID) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/${categoryID}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (
      !response.ok &&
      response.status !== 400 &&
      response.status !== 401 &&
      response.status !== 404
    ) {
      return { success: false, message: "Failed to delete tasks category" };
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message || "Failed to delete tasks category" };
  }
}

export async function updateTaskCategory(categoryID, category) {
  try {
    const response = await fetch(`${CATEGORY}/tasks/${categoryID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (
      !response.ok &&
      response.status !== 400 &&
      response.status !== 401 &&
      response.status !== 404
    ) {
      return { success: false, message: "Failed to update tasks category" };
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message || "Failed to update tasks category" };
  }
}
