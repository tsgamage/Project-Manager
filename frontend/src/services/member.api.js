import API_ENDPOINTS from "../config/api.js";
import responseNotOkay from "../util/responseNotOkay.js";

const { MEMBER } = API_ENDPOINTS;

export async function getAllMembersRequest() {
  try {
    const response = await fetch(`${MEMBER}/`, {
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while fetching members" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while fetching members" };
  }
}

export async function getMemberByIdRequest(memberID) {
  try {
    const response = await fetch(`${MEMBER}/${memberID}`, {
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while fetching member" };
    }

    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message || "Error while fetching member" };
  }
}

export async function deleteMemberRequest(memberID) {
  try {
    const response = await fetch(`${MEMBER}/${memberID}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while deleting member" };
    }
    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while deleting member" };
  }
}

export async function updateMemberRequest(memberID, memberData) {
  try {
    const response = await fetch(`${MEMBER}/${memberID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while updating member" };
    }
    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while updating member" };
  }
}

export async function createMemberRequest(memberData) {
  try {
    const response = await fetch(`${MEMBER}/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Error while creating member" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Error while creating member" };
  }
}
