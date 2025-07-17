import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ViewProjectPage() {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sample project data
  useEffect(() => {
    const sampleProject = {
      _id: "687872cb8bafb261bb9c853a",
      title: "Website Redesign",
      description: "Revamp the company's main website for better UX.",
      startDate: "2025-05-10T00:00:00.000Z",
      endDate: "2025-10-31T00:00:00.000Z",
      status: "Not Started",
      progress: 0,
      team: [
        {
          _id: "687876dc07eb476af1efa144",
          memberID: "wr-tm-1",
          name: "Jamie L",
          role: "UI/UX Designer",
        },
        {
          _id: "687876dc07eb476af1efa145",
          memberID: "wr-tm-2",
          name: "Casey M",
          role: "Frontend Developer",
        },
      ],
      tasks: [
        {
          _id: "687876dc07eb476af1efa146",
          taskID: "wr-1",
          taskName: "Gather requirements",
          completed: false,
        },
        {
          _id: "687876dc07eb476af1efa147",
          taskID: "wr-2",
          taskName: "Create wireframes",
          completed: false,
        },
        {
          _id: "687876dc07eb476af1efa148",
          taskID: "wr-3",
          taskName: "Design mockups",
          completed: false,
        },
        {
          _id: "687876dc07eb476af1efa149",
          taskID: "wr-4",
          taskName: "Develop homepage",
          completed: false,
        },
      ],
    };

    // Simulate other projects
    const other = [
      {
        id: "project-alpha",
        title: "Project Alpha",
        status: "In Progress",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
      },
      {
        id: "mobile-app",
        title: "Mobile App",
        status: "In Progress",
        startDate: "2024-02-20",
        endDate: "2024-11-30",
      },
      {
        id: "database-migration",
        title: "Database Migration",
        status: "Completed",
        startDate: "2024-04-10",
        endDate: "2024-07-20",
      },
    ];

    setProject(sampleProject);
    setOtherProjects(other);
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
      <div className="flex min-h-screen bg-theme-light dark:bg-theme-dark justify-center items-center">
        <div className="text-para-light dark:text-para-dark">
          Loading project...
        </div>
      </div>
    );
  }

  // Calculate days remaining
  const endDate = new Date(project.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-theme-light dark:bg-theme-dark">
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-header-light dark:text-header-dark mb-4">
              Delete Project
            </h3>
            <p className="text-para-light dark:text-para-dark mb-6">
              Are you sure you want to delete "{project.title}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add your delete logic here
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar - Other Projects */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-10 w-72 bg-stone-800 border-r border-stone-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-header-light dark:text-header-dark">
              Other Projects
            </h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-stone-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {otherProjects.map((project) => (
              <Link
                to={`/project/view/${project.id}`}
                key={project.id}
                className="block bg-stone-700 hover:bg-stone-600 rounded-lg p-4 transition-colors"
              >
                <h4 className="font-medium text-stone-200">{project.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusClasses(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs text-stone-400">
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {/* Project Header */}
          <div className="mb-6 pb-6 border-b border-stone-200 dark:border-stone-700">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-header-light dark:text-header-dark">
                  {project.title}
                </h1>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Project ID: {project._id}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusClasses(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    daysRemaining > 0
                      ? daysRemaining < 7
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : daysRemaining < 14
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {daysRemaining > 0
                    ? `${daysRemaining} days left`
                    : "Deadline passed"}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 mb-2">
                <span>Progress: {project.progress}%</span>
                <span>
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    project.progress < 30
                      ? "bg-red-500"
                      : project.progress < 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-header-light dark:text-header-dark mb-3">
              Project Overview
            </h2>
            <p className="text-para-light dark:text-para-dark leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-header-light dark:text-header-dark">
                Team Members
              </h2>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {project.team.length} members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.team.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center bg-white dark:bg-stone-800 rounded-lg p-4 shadow-sm"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-stone-800 dark:text-stone-200">
                      {member.name}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add Team Member Button */}
              <button className="flex items-center justify-center bg-white dark:bg-stone-800 rounded-lg p-4 shadow-sm border-2 border-dashed border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors">
                <div className="bg-stone-100 dark:bg-stone-700 w-12 h-12 rounded-full flex items-center justify-center text-stone-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-stone-800 dark:text-stone-200">
                    Add Member
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Click to add new team member
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Project Tasks */}
          <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm p-4 md:p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-header-light dark:text-header-dark">
                Project Tasks
              </h2>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {project.tasks.filter((t) => t.completed).length} of{" "}
                {project.tasks.length} completed
              </span>
            </div>

            <ul className="space-y-2">
              {project.tasks.map((task) => (
                <li key={task._id}>
                  <label
                    className={`flex items-start p-3 rounded-lg cursor-pointer ${
                      task.completed
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50"
                        : "bg-stone-50 dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 rounded border-stone-300 dark:border-stone-600 text-blue-500 focus:ring-blue-400"
                    />
                    <span
                      className={`ml-3 flex-1 ${
                        task.completed
                          ? "line-through text-stone-500 dark:text-stone-500"
                          : "text-stone-800 dark:text-stone-200"
                      }`}
                    >
                      {task.taskName}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Task
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              to={`/project/edit/${project._id}`}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-lg text-stone-800 dark:text-stone-200 flex items-center justify-center gap-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Project
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center justify-center gap-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
