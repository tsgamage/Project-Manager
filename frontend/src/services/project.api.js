import API_ENDPOINTS from "../config/api";

const API_URL = API_ENDPOINTS.PROJECT;

function responseNotOkay(response) {
  if (
    !response.ok &&
    response.status !== 401 &&
    response.status !== 404 &&
    response.status !== 400
  ) {
    return true;
  }
  return false;
}

export async function getAllProjects() {
  try {
    const response = await fetch(`${API_URL}/`, { credentials: "include" });

    if (responseNotOkay(response)) {
      return { success: false, message: "Failed to fetch projects" };
    }

    return await response.json();
  } catch (e) {
    console.log("Failed to fetch projects", e);
    return { success: false, message: e.message || "Failed to fetch projects" };
  }
}
export async function addNewProject(projectData) {
  try {
    const response = await fetch(`${API_URL}/new`, {
      method: "POST",
      body: JSON.stringify(projectData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (responseNotOkay(response)) {
      return { success: false, message: "Failed to create project" };
    }

    return await response.json();
  } catch (e) {
    return { success: false, message: e.message || "Failed to create project" };
  }
}
export async function deleteProject(selectedProjectID) {
  try {
    const response = await fetch(`${API_URL}/${selectedProjectID}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (responseNotOkay(response)) {
      return { success: false, message: "Failed to Delete project" };
    }

    return await response.json();
  } catch (e) {
    return { success: false, message: e.message || "Failed to Delete project" };
  }
}
export async function getProjectById(projectID) {
  try {
    const response = await fetch(`${API_URL}/${projectID}`, {
      credentials: "include",
    });

    if (response.status === 401) {
      return window.location.replace("/auth/login");
    } else if (responseNotOkay(response)) {
      return { success: false, message: "Failed to fetch project data" };
    }

    return await response.json();
  } catch (e) {
    console.error("Error fetching project data:", e);
    return {
      success: false,
      message: e.message || "An error occurred while fetching project data",
    };
  }
}
