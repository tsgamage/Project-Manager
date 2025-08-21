import { createSlice } from "@reduxjs/toolkit";

const DUMMY_PROJECT = {
  _id: "",
  userID: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  team: [],
  tasks: [],
};

const projectInitialState = {
  projects: [],
  tasksCategories: [],
  selectedProject: DUMMY_PROJECT,
  selectedProjectID: 0,
  isLoading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState: projectInitialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    clearSelectedProject: (state) => {
      state.selectedProject = DUMMY_PROJECT;
    },
    clearSelectedProjectID: (state) => {
      state.selectedProjectID = 0;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setSelecteProjectID: (state, action) => {
      state.selectedProjectID = action.payload;
    },
    setTasksCategories: (state, action) => {
      state.tasksCategories = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice;
