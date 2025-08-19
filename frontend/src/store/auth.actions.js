import { checkAuthStatus, loginRequest, logoutRequest, signupRequest } from "../services/auth.api";
import { authActions } from "./auth.slice";

export const loginThunk = ({ email, password }) => {
  return async (dispatch) => {
    const resData = await loginRequest({ email, password });

    if (resData?.success) {
      dispatch(authActions.setUser(resData.user));
      dispatch(authActions.setAuthendicated(true));
    } else {
      dispatch(authActions.setAuthendicated(false));
    }

    return resData;
  };
};

export const checkAuthStatusThunk = () => {
  return async (dispatch) => {
    dispatch(authActions.setChekingAuth(true));

    const resData = await checkAuthStatus();

    if (resData?.success) {
      dispatch(authActions.setUser(resData.user));
      dispatch(authActions.setAuthendicated(true));
    } else {
      dispatch(authActions.setAuthendicated(false));
    }

    dispatch(authActions.setChekingAuth(false));
    return resData;
  };
};

export const signupThunk = ({ email, name, password }) => {
  return async (dispatch) => {
    const resData = await signupRequest({ email, name, password });

    if (resData?.success) {
      dispatch(authActions.setUser(resData.user));
      dispatch(authActions.setAuthendicated(true));
    } else {
      dispatch(authActions.setAuthendicated(false));
    }

    return resData;
  };
};

export const logoutThunk = () => {
  return async (dispatch) => {
    const resData = await logoutRequest();

    if (resData.success) {
      dispatch(authActions.setAuthendicated(false));
      dispatch(authActions.setUser({}));
    }

    return resData;
  };
};
