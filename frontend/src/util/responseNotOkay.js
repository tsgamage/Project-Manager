import { checkAuthStatus } from "../services/auth.api.js";

export default function responseNotOkay(response) {
  if (response.status === 401) {
    checkAuthStatus();
    return true;
  }
  if (!response.ok && response.status !== 400 && response.status !== 404) {
    return true;
  }
  return false;
}
