import { createContext, useState } from "react";

const ProjectContext = createContext({
  project: {},
  selectedProject: 0,
  setSelectedProject: (projectID) => {},
  setProject: (project) => {},
  addMember: ({ name, role, color }) => {},
  removeMember: (id) => {},
  addTask: (taskName) => {},
  removeTask: (id) => {},
  toggleSelectTask: (id) => {},
});

export function ProjectContextProvider({ children }) {
  const [project, setProject] = useState({
    _id: "",
    name: "",
    description: "",
    status: "",
    team: [],
    tasks: [],
  });
  const [selectedProjectID, setSelectedProjectID] = useState(0);

  function handleProjectSelect(projectID) {
    setSelectedProjectID(projectID);
  }

  function handleSetProject(project) {
    setProject(project);
  }

  function handleAddMember({ name, role, color }) {
    console.log({ name, role, color });
  }

  function handleRemoveMember(id) {
    console.log({ id });
  }

  async function handleAddTask(taskName) {
    const taskObj = {
      taskName,
      completed: false,
    };

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, taskObj],
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/project/${selectedProjectID}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      setProject(resData.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function handleRemoveTask(id) {
    const updatedProject = {
      ...project,
      tasks: [...project.tasks.filter((task) => task._id !== id)],
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/project/${selectedProjectID}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      setProject(resData.data);
    } catch (e) {
      console.log(e.message);
      setProject(project);
    }
  }
  async function handleSelectTask(id) {
    let task = project.tasks.find((task) => task._id === id);
    task = {
      ...task,
      completed: !task.completed,
    };
    const updatedProject = {
      ...project,
      tasks: [...project.tasks.filter((task) => task._id !== id), task],
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/project/${selectedProjectID}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      setProject(resData.data);
    } catch (e) {
      console.log(e.message);
      setProject(project);
    }
  }

  const ctxValue = {
    project,
    selectedProject: selectedProjectID,
    setSelectedProject: handleProjectSelect,
    setProject: handleSetProject,
    addMember: handleAddMember,
    removeMember: handleRemoveMember,
    addTask: handleAddTask,
    removeTask: handleRemoveTask,
    toggleSelectTask: handleSelectTask,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
