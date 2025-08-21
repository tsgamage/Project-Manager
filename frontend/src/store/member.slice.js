import { createSlice } from "@reduxjs/toolkit";

const memberInitialState = {
  members: [],
  memberCategories: [],
  isLoading: false,
};

const memberSlice = createSlice({
  name: "member",
  initialState: memberInitialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setMemberCategories: (state, action) => {
      state.memberCategories = action.payload;
    },
    clearMembers: (state) => {
      state.members = [];
    },
    clearMemberCategory: (state) => {
      state.memberCategories = [];
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice;
