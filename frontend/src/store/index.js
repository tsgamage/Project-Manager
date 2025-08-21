import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import memberSlice from "./member.slice";
import projectSlice from "./project.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    team: memberSlice.reducer,
    project: projectSlice.reducer,
  },
});

export default store;
