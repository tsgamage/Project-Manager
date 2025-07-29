import { useEffect } from "react";
import { createContext, useState } from "react";
import AuthContext from "./auth.context";
import { useContext } from "react";
import { API_ENDPOINTS } from "../config/api.js";

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

  async function fetchProjects() {
    try {
      const response = await fetch(`${API_URL}/`, {
        credentials: "include",
      });

      if (!response.ok) {
        return new Response(JSON.stringify({ message: "Something went wrong" }), {
          status: 500,
        });
      }
      const resData = await response.json();
      setProjects(resData.data);
      console.log("Projects fetched successfully", resData.data);
    } catch (e) {
      return new Response(JSON.stringify({ message: e.message }), {
        status: 500,
      });
    }
  }
  useEffect(() => {
    fetchProjects();
  }, [user]);

  async function handleSetSelectedProject(selectedProjectID) {
    try {
      const response = await fetch(`${API_URL}/${selectedProjectID}`, {
        credentials: "include",
      });

      const resData = await response.json();

      if (response.status === 401) {
        return window.location.replace("/auth/login");
      } else if (!response.ok) {
        return { success: false, message: resData.message || "Failed to fetch project data" };
      }

      setSelectedProject(resData.data.projects);
    } catch (e) {
      console.error("Error fetching project data:", e);
      return {
        success: false,
        message: e.message || "An error occurred while fetching project data",
      };
    }
  }
  useEffect(() => {
    if (selectedProjectID) {
      handleSetSelectedProject(selectedProjectID);
    }
  }, [selectedProjectID]);

  function handleSelectedProjectID(projectID) {
    setSelectedProjectID(projectID);
  }
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
  async function handleAddNewProject(projectData) {
    try {
      const response = await fetch(`${API_URL}/new`, {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Something went wrong" }), {
          status: 500,
        });
      }
      const resData = await response.json();

      setProjects([resData.data, ...projects]);
    } catch (e) {
      throw new Response(JSON.stringify({ message: e.message }), {
        status: 500,
      });
    }
  }
  async function handleDeleteProject() {
    const response = await fetch(`${API_URL}/${selectedProjectID}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    setSelectedProject(EMPTY_PROJECT);
    setProjects(projects.filter((p) => p._id !== selectedProjectID));
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
