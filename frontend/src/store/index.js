import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import memberSlice from "./member.slice";
import projectSlice from "./project.slice";
import uiSlice from "./ui.slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    team: memberSlice.reducer,
    project: projectSlice.reducer,
  },
});

export default store;
