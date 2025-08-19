import API_ENDPOINTS from "../config/api";

const { AUTH } = API_ENDPOINTS;

function responseNotOkay(response) {
  if (response.status === 401) {
    checkAuthStatus();
    return true;
  }
  if (!response.ok && response.status !== 400 && response.status !== 404) {
    return true;
  }
  return false;
}

export async function loginRequest({ email, password }) {
  try {
    const response = await fetch(`${AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Login failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Login failed" };
  }
}

export async function checkAuthStatus() {
  try {
    const response = await fetch(`${AUTH}/check-auth`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (
      !response.ok &&
      response.status !== 400 &&
      response.status !== 404 &&
      response.status === 401
    ) {
      return { success: false, message: data.message || "Login failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Auth Check Failed" };
  }
}

export async function signupRequest({ email, password, name }) {
  try {
    const response = await fetch(`${AUTH}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Signup failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Signup failed" };
  }
}

export async function logoutRequest() {
  try {
    const response = await fetch(`${AUTH}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Logout failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Logout failed" };
  }
}

export async function verifyEmailRequest(code) {
  try {
    const response = await fetch(`${AUTH}/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Verification failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Verification failed" };
  }
}

export async function resendVerificationCodeRequest() {
  try {
    const response = await fetch(`${AUTH}/resend-verification`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Resend failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Resend failed" };
  }
}

export async function forgotPasswordRequest(email) {
  try {
    const response = await fetch(`${AUTH}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Forgot password failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Forgot password failed" };
  }
}

export async function resetPasswordRequest(token, password) {
  try {
    const response = await fetch(`${AUTH}/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Password reset failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Password reset failed" };
  }
}

export async function changePasswordRequest(oldPassword, newPassword) {
  try {
    const response = await fetch(`${AUTH}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();

    if (responseNotOkay(response)) {
      return { success: false, message: data.message || "Password change failed" };
    }

    return data;
  } catch (err) {
    return { success: false, message: err.message || "Password change failed" };
  }
}
