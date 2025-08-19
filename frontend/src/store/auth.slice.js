import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { user: {}, isChekingAuth: true, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAuthendicated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setChekingAuth: (state, action) => {
      state.isChekingAuth = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
