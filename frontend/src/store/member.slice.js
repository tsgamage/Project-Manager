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
    // * Member Reducers
    fetchMembers: (state, action) => {
      state.members = action.payload;
    },
    addMember: (state, action) => {
      const updatedList = [action.payload, ...state.members];
      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      state.members = updatedList;
    },
    updateMember: (state, action) => {
      const updatedList = state.members.filter((m) => m._id !== action.payload._id);
      updatedList.push(action.payload);
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      state.members = updatedList;
    },
    deleteMember: (state, action) => {
      const updatedList = state.members.filter((m) => m._id !== action.payload._id);
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      state.members = updatedList;
    },
    clearMembers: (state) => {
      state.members = [];
    },
    // * Category Reducers
    fetchMemberCategories: (state, action) => {
      state.memberCategories = action.payload;
    },
    addMemberCategory: (state, action) => {
      const updatedList = [...state.memberCategories, action.payload];
      state.memberCategories = updatedList;
    },
    updateMemberCategory: (state, action) => {
      const updatedList = state.memberCategories.filter((cat) => cat._id !== action.payload._id);
      updatedList.push(action.payload);
      state.memberCategories = updatedList;
    },
    deleleMemberCategory: (state, action) => {
      const updatedList = state.memberCategories.filter((cat) => cat._id !== action.payload._id);
      state.memberCategories = updatedList;
    },
    clearMemberCategory: (state) => {
      state.memberCategories = [];
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice;
