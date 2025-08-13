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
  } catch (err) {
    console.log("Failed to fetch projects", err);
    return { success: false, message: err.message || "Failed to fetch projects" };
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
  } catch (err) {
    console.log("Failed to create project", err);
    return { success: false, message: err.message || "Failed to create project" };
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
  } catch (err) {
    console.log("Failed to Delete project", err);
    return { success: false, message: err.message || "Failed to Delete project" };
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
  } catch (err) {
    console.error("Error fetching project data:", err);
    return {
      success: false,
      message: err.message || "An error occurred while fetching project data",
    };
  }
}
export async function updateProject(projectID, newProjectData) {
  try {
    const response = await fetch(`${API_URL}/${projectID}`, {
      method: "PUT",
      body: JSON.stringify(newProjectData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (responseNotOkay(response)) {
      return { success: false, message: "Failed to update project" };
    }
    if (response.status === 401) {
      window.location.replace("/auth/login");
    }

    return await response.json();
  } catch (err) {
    console.log("Failed to update project", err);
    return { success: false, message: err.message || "Failed to update project" };
  }
}
