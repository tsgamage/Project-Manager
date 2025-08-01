import { QueryClient } from "@tanstack/react-query"
import API_ENDPOINTS from "../config/api"

const { MEMBER } = API_ENDPOINTS
export const queryClient = new QueryClient()

export async function getAllMembers() {
    try {
        const response = await fetch(`${MEMBER}/`, {
            credentials: "include"
        })
        if (!response.ok) {
            return { success: false, message: "Error while fetching members" }
        }

        return await response.json()
    } catch (err) {
        console.log(err.message)
        return { success: false, message: err.message || "Error while fetching members" }
    }
}

export async function getMemberById(memberID) {
    try {
        const response = await fetch(`${MEMBER}/${memberID}`, {
            credentials: "include"
        })
        if (!response.ok) {
            return { success: false, message: "Error while fetching member" }
        }
        return await response.json()
    } catch (err) {
        console.log(err.message)
        return { success: false, message: err.message || "Error while fetching member" }
    }
}

export async function deleteMember(memberID) {
    try {
        const response = await fetch(`${MEMBER}/${memberID}`, {
            method: "DELETE",
            credentials: "include"
        })
        if (!response.ok) {
            return { success: false, message: "Error while deleting member" }
        }
        return await response.json()

    } catch (err) {
        console.log(err.message)
        return { success: false, message: err.message || "Error while deleting member" }
    }
}

export async function updateMember(memberID, memberData) {
    try {
        const response = await fetch(`${MEMBER}/${memberID}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberData)
        })

        if (!response.ok) {
            return { success: false, message: "Error while updating member" }
        }

        return await response.json()
    } catch (err) {
        console.log(err.message)
        return { success: false, message: err.message || "Error while updating member" }
    }
}

export async function createMember(memberData) {
    try {
        const response = await fetch(`${MEMBER}/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberData)
        })
        if (!response.ok) {
            return { success: false, message: "Error while creating member" }
        }
        return await response.json()
    } catch (err) {
        console.log(err.message)
        return { success: false, message: err.message || "Error while creating member" }
    }
}