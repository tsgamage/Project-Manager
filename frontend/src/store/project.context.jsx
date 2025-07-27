import { createContext, useState } from "react";

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
});

const EMPTY_PROJECT = {
  _id: "DUMMY",
  name: "",
  description: "",
  status: "",
  team: [],
  tasks: [],
};

export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([EMPTY_PROJECT]);
  const [selectedProject, setSelectedProject] = useState(EMPTY_PROJECT);
  const [selectedProjectID, setSelectedProjectID] = useState(0);

  async function updateRequest(projectData) {
    try {
      const response = await fetch(`http://localhost:3000/api/project/${selectedProjectID}`, {
        method: "PUT",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      return resData.data;
    } catch (e) {
      console.log(e.message);
    }
  }
  function handleSetSelectedProject(projectData) {
    setSelectedProject(projectData);
  }
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
      const response = await fetch("http://localhost:3000/api/project/new", {
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
    const response = await fetch(`http://localhost:3000/api/project/${selectedProjectID}`, {
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
  };

  return <ProjectContext.Provider value={ctxValue}>{children}</ProjectContext.Provider>;
}

export default ProjectContext;
