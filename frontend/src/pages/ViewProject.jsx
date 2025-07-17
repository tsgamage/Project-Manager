import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewProjectPage() {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);

  // Simulate fetching project data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = () => {
      const projects = [
        {
          id: "project-alpha",
          title: "Project Alpha",
          description: "Develop a new AI-powered analytics platform with advanced machine learning capabilities and real-time data processing.",
          startDate: "2024-01-15",
          endDate: "2024-06-30",
          status: "In Progress",
          tasks: [
            { id: 1, title: "Research requirements", completed: true },
            { id: 2, title: "Design architecture", completed: true },
            { id: 3, title: "Develop core modules", completed: false },
            { id: 4, title: "Implement ML algorithms", completed: false },
            { id: 5, title: "Create user dashboard", completed: false },
            { id: 6, title: "Testing and QA", completed: false }
          ],
          team: [
            { name: "Alex Johnson", role: "Team Lead" },
            { name: "Sam Rivera", role: "Frontend Dev" },
            { name: "Taylor Kim", role: "ML Engineer" }
          ]
        },
        // More projects...
      ];

      const currentProject = projects.find(p => p.id === projectID) || projects[0];
      const other = projects.filter(p => p.id !== projectID).slice(0, 3);

      setProject(currentProject);
      setOtherProjects(other);
    };

    fetchData();
  }, [projectID]);

  // Helper for status colors
  const getStatusClasses = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  if (!project) {
    return (
        <section className="flex min-h-screen min-w-screen bg-theme-light dark:bg-theme-dark justify-center items-center">
          <div className="text-para-light dark:text-para-dark">Loading project...</div>
        </section>
    );
  }

  return (
      <section className="flex min-h-screen min-w-screen bg-theme-light dark:bg-theme-dark">
        {/* Sidebar - Other Projects */}
        <aside className="w-full md:w-1/3 p-6 bg-stone-800 border-r border-stone-700">
          <h3 className="text-xl text-center text-header-light dark:text-header-dark mb-6">
            Other Projects
          </h3>
          <div className="space-y-4">
            {otherProjects.map(project => (
                <div
                    key={project.id}
                    className="bg-stone-700 rounded-lg p-4 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <h4 className="font-semibold text-stone-200">{project.title}</h4>
                  <div className="flex justify-between mt-2">
                <span className={`text-xs px-2 py-1 rounded ${getStatusClasses(project.status)}`}>
                  {project.status}
                </span>
                    <span className="text-xs text-stone-400">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
                  </div>
                </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 overflow-y-auto">
          {/* Project Header */}
          <div className="mb-8 pb-6 border-b border-stone-700">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-header-light dark:text-header-dark">
                {project.title}
              </h1>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusClasses(project.status)}`}>
              {project.status}
            </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400">Start Date</p>
                <p className="text-para-light dark:text-para-dark">
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400">End Date</p>
                <p className="text-para-light dark:text-para-dark">
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400">Progress</p>
                <p className="text-para-light dark:text-para-dark">
                  42% Complete
                </p>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-header-light dark:text-header-dark mb-4">
              Project Overview
            </h2>
            <p className="text-para-light dark:text-para-dark leading-relaxed">
              {project.description} This project aims to revolutionize how businesses analyze their
              customer data by implementing cutting-edge machine learning algorithms that can predict
              trends with 95% accuracy. Our team is focused on creating an intuitive interface that
              makes complex analytics accessible to all stakeholders.
            </p>
          </div>

          {/* Project Team */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-header-light dark:text-header-dark mb-4">
              Team Members
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.team.map((member, index) => (
                  <div key={index} className="flex items-center bg-stone-800 rounded-lg p-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center text-gray-500">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-stone-200">{member.name}</p>
                      <p className="text-sm text-stone-400">{member.role}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Project Tasks */}
          <div className="bg-stone-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-header-light dark:text-header-dark">
                Project Tasks
              </h2>
              <span className="text-sm text-stone-400">3/6 completed</span>
            </div>

            <ul className="space-y-3">
              {project.tasks.map(task => (
                  <li
                      key={task.id}
                      className={`flex items-center p-3 rounded-lg ${
                          task.completed
                              ? "bg-green-900/20 border border-green-800/50"
                              : "bg-stone-700 hover:bg-stone-600/50"
                      }`}
                  >
                    <input
                        id={`task-${task.id}`}
                        type="checkbox"
                        defaultChecked={task.completed}
                        className="h-5 w-5 rounded border-stone-600 bg-stone-800 text-blue-500 focus:ring-blue-400"
                    />
                    <label
                        htmlFor={`task-${task.id}`}
                        className={`ml-3 w-full ${task.completed ? 'line-through text-stone-500' : 'text-para-light dark:text-para-dark'}`}
                    >
                      {task.title}
                    </label>
                    {!task.completed && (
                        <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded ml-auto">
                    In progress
                  </span>
                    )}
                  </li>
              ))}
            </ul>

            <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Task
            </button>
          </div>
        </div>
      </section>
  );
}