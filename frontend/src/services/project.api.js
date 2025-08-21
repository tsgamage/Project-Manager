import API_ENDPOINTS from "../config/api";
import responseNotOkay from "../util/responseNotOkay";

const { PROJECT } = API_ENDPOINTS;

export async function getAllProjectsRequest() {
  try {
    const response = await fetch(`${PROJECT}/`, { credentials: "include" });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to fetch projects" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to fetch projects" };
  }
}
export async function addNewProjectRequest(projectData) {
  try {
    const response = await fetch(`${PROJECT}/new`, {
      method: "POST",
      body: JSON.stringify(projectData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to create project" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to create project" };
  }
}
export async function deleteProjectRequest(selectedProjectID) {
  try {
    const response = await fetch(`${PROJECT}/${selectedProjectID}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to Delete project" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to Delete project" };
  }
}
export async function getProjectByIdRequest(projectID) {
  try {
    const response = await fetch(`${PROJECT}/${projectID}`, {
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to fetch project data" };
    }

    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || "An error occurred while fetching project data",
    };
  }
}
export async function updateProjectRequest(projectID, newProjectData) {
  try {
    const response = await fetch(`${PROJECT}/${projectID}`, {
      method: "PUT",
      body: JSON.stringify(newProjectData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Failed to update project" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Failed to update project" };
  }
}
