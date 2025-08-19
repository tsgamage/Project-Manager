import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import memberSlice from "./member.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    members: memberSlice.reducer,
  },
});

export default store;
