import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  mobileSideBarOpen: false,
  desktopDideBarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    setMobileSideBarOpen: (state, action) => {
      state.mobileSideBarOpen = action.payload;
    },
    setDesktopSideBarCollapsed: (state, action) => {
      state.desktopDideBarCollapsed = action.payload;
    },
    toggleMobileSideBar: (state) => {
      state.mobileSideBarOpen = !state.mobileSideBarOpen;
    },
    toggleDesktopSideBar: (state) => {
      state.desktopDideBarCollapsed = !state.desktopDideBarCollapsed;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
