import API_ENDPOINTS from "../config/api.js";

const {CATEGORY} = API_ENDPOINTS;

export async function getMemberCategories() {
    try {
        const response = await fetch(`${CATEGORY}/member`, {
            credentials: "include",
        });
        return await response.json();
    } catch (err) {
        console.log(err.message);
        return {success: false, message: err.message || "Error while fetching member categories"};
    }
}

export async function updateMemberCategory(categoryID, category) {
    try {
        const response = await fetch(`${CATEGORY}/member/${categoryID}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
        if (!response.ok && response.status !== 400) {
            return {success: false, message: "Error while updating member category"};
        }
        return await response.json();
    } catch (err) {
        console.log(err.message);
        return {success: false, message: err.message || "Error while updating member category"};
    }
}

export async function addMemberCategory(category) {
    try {
        const response = await fetch(`${CATEGORY}/member/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            return {success: false, message: "Error while creating member category"};
        }
        return response.json();
    } catch (err) {
        console.log(err.message);
        return {success: false, message: err.message || "Error while creating member category"};
    }
}

export async function deleteMemberCategory(categoryID) {
    try {
        const response = await fetch(`${CATEGORY}/member/${categoryID}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!response.ok && response.status !== 400) {
            return {success: false, message: "Error while deleting member category"};
        }
        return await response.json();
    } catch (err) {
        console.log(err.message);
        return {success: false, message: err.message || "Error while deleting member category"};
    }
}
