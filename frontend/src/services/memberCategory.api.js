import API_ENDPOINTS from "../config/api.js";
import responseNotOkay from "../util/responseNotOkay.js";

const { CATEGORY } = API_ENDPOINTS;

export async function getMemberCategoriesRequest() {
  try {
    const response = await fetch(`${CATEGORY}/member`, {
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, messgae: data.message || "Error while fetching member categories" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while fetching member categories" };
  }
}

export async function updateMemberCategoryRequest(categoryID, category) {
  try {
    const response = await fetch(`${CATEGORY}/member/${categoryID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while updating member category" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while updating member category" };
  }
}

export async function createMemberCategoryRequest(category) {
  try {
    const response = await fetch(`${CATEGORY}/member/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while creating member category" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while creating member category" };
  }
}

export async function deleteMemberCategoryRequest(categoryID) {
  try {
    const response = await fetch(`${CATEGORY}/member/${categoryID}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while deleting member category" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while deleting member category" };
  }
}
