import { useEffect } from "react";
import { createContext, useState } from "react";
import AuthContext from "./auth.context";
import { useContext } from "react";
import { API_ENDPOINTS } from "../config/api.js";
import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/project.api.js";
import {
  createTaskCategory,
  deleteTaskCategory,
  getTasksCategories,
  updateTaskCategory,
} from "../services/tasksCategory.api.js";

const API_URL = API_ENDPOINTS.PROJECT;

const ProjectContext = createContext({
  projects: [],
  setProjects: () => {},
  selectedProject: {},
  setSelectedProject: () => {},
  setSelectedProjectID: () => {},

  addMember: () => {},
  removeMember: () => {},

  addTask: () => {},
  removeTask: () => {},
  toggleSelectTask: () => {},
  updateTask: () => {},

  updateProject: () => {},
  addNewProject: () => {},
  deleteProject: () => {},
  fetchProjects: () => {},

  tasksCategories: [],
  setTasksCategories: () => {},
  addTaskCategory: () => {},
  deleteTaskCategory: () => {},
  updateTaskCategory: () => {},
});
const EMPTY_PROJECT = {
  _id: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  team: [],
  tasks: [],
};

export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(EMPTY_PROJECT);
  const [selectedProjectID, setSelectedProjectID] = useState(0);
  const [tasksCategories, setTasksCategories] = useState([]);
  const { user } = useContext(AuthContext);

  // ---- Project Fetching Function ----
  async function fetchProjects() {
    const resData = await getAllProjects();
    if (resData.success) {
      setProjects(resData.data);
    }
  }

  // ---- Tasks Categories Fetching Function ----
  async function fetchTasksCategories() {
    const resData = await getTasksCategories();
    if (resData.success) {
      setTasksCategories(resData.data);
    }
  }

  useEffect(() => {
    fetchProjects();
    fetchTasksCategories();
  }, [user]);

  // ------------------- PROJECT -------------------
  async function handleAddNewProject(projectData) {
    const resData = await addNewProject(projectData);
    if (resData.success) {
      setProjects([resData.data, ...projects]);
    }
    return resData;
  }

  async function handleDeleteProject() {
    const resData = await deleteProject(selectedProjectID);
    if (resData.success) {
      setSelectedProject(EMPTY_PROJECT);
      setProjects(projects.filter((p) => p._id !== selectedProjectID));
    }
    return resData;
  }

  async function handleSetSelectedProject(selectedProjectID) {
    const resData = await getProjectById(selectedProjectID);
    if (resData.success) {
      setSelectedProject(resData.data.projects);
    }
  }
  useEffect(() => {
    if (selectedProjectID) {
      handleSetSelectedProject(selectedProjectID);
    }
  }, [selectedProjectID]);

  async function handleUpdateProject(newProjectData) {
    const resData = await updateProject(selectedProject._id, newProjectData);
    setSelectedProject(resData.data);
    const updatedProjects = [
      resData.data,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];
    setProjects(updatedProjects);
  }

  // ------------------- MEMBER -------------------
  async function handleAddMember(memberID) {
    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team, ...memberID],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  async function handleRemoveMember(id) {
    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team.filter((mID) => mID !== id)],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  // ------------------- TASKS -------------------

  async function handleAddTask(taskObj) {
    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, taskObj],
    };

    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];
    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  async function handleRemoveTask(id) {
    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks.filter((t) => t._id !== id)],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  async function handleUpdateTask(id, name, description) {
    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.map((task) =>
        task._id === id ? { ...task, taskName: name, taskDescription: description } : task
      ),
    };

    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  async function handleSelectTask(id) {
    const updatedTasks = selectedProject.tasks.map((task) =>
      task._id === id ? { ...task, completed: !task.completed } : task
    );

    const updatedProject = {
      ...selectedProject,
      tasks: updatedTasks,
    };

    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateProject(selectedProject._id, updatedProject);
    if (resData.success) {
      setSelectedProject(resData.data);
      setProjects(updatedProjects);
    }
    return resData;
  }

  //  -------------------------- Task Category Functions ---------------------------------

  async function handleAddTaskCategory(category) {
    const resData = await createTaskCategory(category);

    if (resData.success) {
      setTasksCategories((prevCategories) => [...prevCategories, resData.data]);
    }
    return resData;
  }

  async function handleRemoveTaskCategory(categoryID) {
    const resData = await deleteTaskCategory(categoryID);

    if (resData.success) {
      setTasksCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryID)
      );
    }
  }

  async function handleUpdateTaskCategory(categoryID, category) {
    const resData = await updateTaskCategory(categoryID, category);
    if (resData.success) {
      const updatedList = tasksCategories.map((category) =>
        category._id === categoryID ? resData.data : category
      );
      setTasksCategories(updatedList);
    }
    return resData;
  }

  const ctxValue = {
    projects,
    setProjects,
    selectedProject,
    setSelectedProject: handleSetSelectedProject,
    setSelectedProjectID,

    addMember: handleAddMember,
    removeMember: handleRemoveMember,

    addTask: handleAddTask,
    removeTask: handleRemoveTask,
    toggleSelectTask: handleSelectTask,
    updateTask: handleUpdateTask,

    updateProject: handleUpdateProject,
    addNewProject: handleAddNewProject,
    deleteProject: handleDeleteProject,
    fetchProjects,

    tasksCategories,
    setTasksCategories,
    addTaskCategory: handleAddTaskCategory,
    deleteTaskCategory: handleRemoveTaskCategory,
    updateTaskCategory: handleUpdateTaskCategory,
  };

  return <ProjectContext.Provider value={ctxValue}>{children}</ProjectContext.Provider>;
}

export default ProjectContext;
