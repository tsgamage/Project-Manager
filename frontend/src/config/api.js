// API Configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  USER: `${API_BASE_URL}/api/user`,
  PROJECT: `${API_BASE_URL}/api/project`,
  MEMBER: `${API_BASE_URL}/api/member`,
};

export default API_ENDPOINTS;
