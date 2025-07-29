import { createContext } from "react";
import { API_ENDPOINTS } from "../config/api.js";

const API_URL = API_ENDPOINTS.USER;

const UserContext = createContext({
  updateName: () => {},
});

export function UserContextProvider({ children }) {
  async function updateName(name) {
    try {
      const response = await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      console.log("Update Name Response:", data);

      if (!response.ok) {
        return { success: false, message: data.message || "Failed to update name" };
      }

      return {
        success: true,
        message: data.message || "Name updated successfully",
        user: data.user,
      };
    } catch (error) {
      console.error("Error updating name:", error);
      return { success: false, message: error.message || "An error occurred while updating name" };
    }
  }

  const userCtxValue = {
    updateName,
  };
  return <UserContext value={userCtxValue}>{children}</UserContext>;
}

export default UserContext;
