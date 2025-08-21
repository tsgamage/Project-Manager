import {
  addNewProjectRequest,
  deleteProjectRequest,
  getAllProjectsRequest,
  getProjectByIdRequest,
  updateProjectRequest,
} from "../services/project.api";
import {
  createTaskCategoryRequest,
  deleteTaskCategoryRequest,
  getTasksCategoriesRequest,
  updateTaskCategoryRequest,
} from "../services/tasksCategory.api";
import { projectActions } from "./project.slice";

export const fetchProjectsThunk = () => {
  return async (dispatch) => {
    dispatch(projectActions.setIsLoading(true));

    const resData = await getAllProjectsRequest();

    if (resData.success) {
      dispatch(projectActions.setProjects(resData.data));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const fetchProjectByIdThunk = () => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { selectedProjectID } = getState().project;

    const resData = await getProjectByIdRequest(selectedProjectID);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const createNewProjectThunk = (projectData) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { projects } = getState().project;

    const resData = await addNewProjectRequest(projectData);

    if (resData.success) {
      dispatch(projectActions.setProjects([resData.data, ...projects]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const updateProjectThunk = (projectData) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { projects, selectedProject } = getState().project;

    const updatedList = projects.filter((p) => p._id !== selectedProject._id);

    const resData = await updateProjectRequest(selectedProject._id, projectData);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...updatedList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const deleteProjectThunk = () => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { projects, selectedProject } = getState().project;

    const resData = await deleteProjectRequest(selectedProject._id);

    const updatedProjects = projects.filter((p) => p._id !== selectedProject._id);

    if (resData.success) {
      dispatch(projectActions.setProjects(updatedProjects));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const addMemberToProjectThunk = (memberID) => {
  return async (dispatch, getState) => {
    const { selectedProject, projects } = getState().project;

    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team, memberID],
    };
    const projectList = projects.filter((p) => p._id !== selectedProject._id);

    const resData = await updateProjectRequest(selectedProject._id, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const removeMemberFromProjectThunk = (memberID) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { selectedProject, projects } = getState().project;

    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team.filter((m) => m._id !== memberID)],
    };

    const projectList = projects.filter((p) => p._id !== selectedProject._id);
    const resData = await updateProjectRequest(selectedProject._id, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const addTaskToProjectThunk = (taskData) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { projects, selectedProject } = getState().project;

    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, taskData],
    };
    const projectList = projects.filter((p) => p._id !== selectedProject._id);

    const resData = await updateProjectRequest(selectedProject._id, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const updateTaskThunk = (projectID, taskID, taskData) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { selectedProject, projects } = getState().project;

    const updatedTasks = selectedProject.tasks.map((t) =>
      t._id === taskID ? { ...t, ...taskData } : t
    );

    const updatedProject = {
      ...selectedProject,
      tasks: updatedTasks,
    };
    const projectList = projects.filter((p) => p._id !== projectID);

    const resData = await updateProjectRequest(projectID, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const toggleSelectTaskThunk = (taskID) => {
  return async (dispatch, getState) => {
    projectActions.setIsLoading(true);
    const { selectedProject, projects } = getState().project;

    const updatedTasks = selectedProject.tasks.map((t) => {
      return t._id === taskID ? { ...t, completed: !t.completed } : t;
    });

    const updatedProject = {
      ...selectedProject,
      tasks: updatedTasks,
    };

    const projectList = projects.filter((p) => p._id !== selectedProject._id);

    const resData = await updateProjectRequest(selectedProject._id, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const removeTaskFromProjectThunk = (taskID) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { selectedProject, projects } = getState().project;

    const updatedTasks = selectedProject.tasks.filter((t) => t._id !== taskID);
    const updatedProject = {
      ...selectedProject,
      tasks: updatedTasks,
    };
    const projectList = projects.filter((p) => p._id !== selectedProject._id);

    const resData = await updateProjectRequest(selectedProject._id, updatedProject);

    if (resData.success) {
      dispatch(projectActions.setSelectedProject(resData.data));
      dispatch(projectActions.setProjects([resData.data, ...projectList]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const fetchTaskCategoryThunk = () => {
  return async (dispatch) => {
    dispatch(projectActions.setIsLoading(true));
    const resData = await getTasksCategoriesRequest();

    if (resData.success) {
      dispatch(projectActions.setTasksCategories(resData.data));
    }
    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const createTaskCategoryThunk = (category) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { tasksCategories } = getState().project;

    const resData = await createTaskCategoryRequest(category);

    if (resData.success) {
      dispatch(projectActions.setTasksCategories([...tasksCategories, resData.data]));
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const removeTaskCategoryThunk = (categoryID) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { tasksCategories } = getState().project;

    const resData = await deleteTaskCategoryRequest(categoryID);

    if (resData.success) {
      dispatch(
        projectActions.setTasksCategories(tasksCategories.filter((cat) => cat._id !== categoryID))
      );
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};

export const updateTaskCategoryThunk = (categoryID, category) => {
  return async (dispatch, getState) => {
    dispatch(projectActions.setIsLoading(true));
    const { tasksCategories } = getState().project;

    const resData = await updateTaskCategoryRequest(categoryID, category);

    if (resData.success) {
      dispatch(
        projectActions.setTasksCategories(
          tasksCategories.map((cat) => (cat._id === categoryID ? resData.data : cat))
        )
      );
    }

    dispatch(projectActions.setIsLoading(false));
    return resData;
  };
};
