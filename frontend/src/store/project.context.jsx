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
} from "../services/project.api.js";

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
  updateProject: () => {},
  addNewProject: () => {},
  deleteProject: () => {},
  fetchProjects: () => {},
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
  const { user } = useContext(AuthContext);

  async function updateRequest(projectData) {
    try {
      const response = await fetch(`${API_URL}/${selectedProjectID}`, {
        method: "PUT",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 401) {
        window.location.replace("/auth/login");
        return [EMPTY_PROJECT];
      } else if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      return resData.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  // ---- Project feching function ----
  async function fetchProjects() {
    const resData = await getAllProjects();
    if (resData.success) {
      setProjects(resData.data);
    }
  }
  useEffect(() => {
    fetchProjects();
  }, [user]);

  async function handleAddNewProject(projectData) {
    const resData = await addNewProject(projectData);
    if (resData.success) {
      setProjects([resData.data, ...projects]);
    }
  }

  async function handleDeleteProject() {
    const resData = await deleteProject(selectedProjectID);
    if (resData.success) {
      setSelectedProject(EMPTY_PROJECT);
      setProjects(projects.filter((p) => p._id !== selectedProjectID));
    }
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

  // handle project select
  function handleSelectedProjectID(projectID) {
    setSelectedProjectID(projectID);
  }

  // this will expose the projects set function to consumer components
  function handleSetProjects(project) {
    setProjects(project);
  }

  async function handleAddMember(member) {
    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team, member],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];
    const resData = await updateRequest(updatedProject);
    setSelectedProject(resData);
    setProjects(updatedProjects);
  }

  async function handleRemoveMember(id) {
    const updatedProject = {
      ...selectedProject,
      team: [...selectedProject.team.filter((p) => p._id !== id)],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];
    const resData = await updateRequest(updatedProject);
    setSelectedProject(resData);
    setProjects(updatedProjects);
  }

  async function handleAddTask(taskName) {
    const taskObj = {
      taskName,
      completed: false,
    };
    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, taskObj],
    };
    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];
    const resData = await updateRequest(updatedProject);
    setSelectedProject(resData);
    setProjects(updatedProjects);
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
    const resData = await updateRequest(updatedProject);
    setSelectedProject(resData);
    setProjects(updatedProjects);
  }

  async function handleSelectTask(id) {
    let task = selectedProject.tasks.find((task) => task._id === id);
    task = {
      ...task,
      completed: !task.completed,
    };
    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks.filter((task) => task._id !== id), task],
    };

    const updatedProjects = [
      updatedProject,
      ...projects.filter((p) => p._id !== selectedProject._id),
    ];

    const resData = await updateRequest(updatedProject);
    setSelectedProject(resData);
    setProjects(updatedProjects);
  }

  async function handleUpdateProject(projectData) {
    const response = await updateRequest(projectData);
    setSelectedProject(response);
    const updatedProjects = [response, ...projects.filter((p) => p._id !== selectedProject._id)];
    setProjects(updatedProjects);
  }

  const ctxValue = {
    projects,
    setProjects: handleSetProjects,
    selectedProject,
    setSelectedProject: handleSetSelectedProject,
    setSelectedProjectID: handleSelectedProjectID,
    addMember: handleAddMember,
    removeMember: handleRemoveMember,
    addTask: handleAddTask,
    removeTask: handleRemoveTask,
    toggleSelectTask: handleSelectTask,
    updateProject: handleUpdateProject,
    addNewProject: handleAddNewProject,
    deleteProject: handleDeleteProject,
    fetchProjects,
  };

  return <ProjectContext.Provider value={ctxValue}>{children}</ProjectContext.Provider>;
}

export default ProjectContext;
