import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Array of 10 Tailwind background colors for team members
const MEMBER_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export default function EditProjectPage() {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memberColor, setMemberColor] = useState(MEMBER_COLORS[0]);
  const [newTask, setNewTask] = useState("");
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: null, id: null });

  // Load project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/project/${projectID}`);
        const data = await response.json();
        setProject(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectID]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Project updated:", project);
    navigate(`/project/view/${projectID}`);
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      _id: Date.now().toString(),
      taskID: `task-${project.tasks.length + 1}`,
      taskName: newTask,
      completed: false,
    };

    setProject((prev) => ({
      ...prev,
      tasks: [...prev.tasks, task],
    }));
    setNewTask("");
  };

  // Add new team member
  const addMember = () => {
    if (newMember.name.trim() === "" || newMember.role.trim() === "") return;

    const member = {
      _id: Date.now().toString(),
      memberID: `member-${project.team.length + 1}`,
      name: newMember.name,
      role: newMember.role,
      color: memberColor,
    };

    setProject((prev) => ({
      ...prev,
      team: [...prev.team, member],
    }));
    setNewMember({ name: "", role: "" });
  };

  // Delete item (member or task)
  const handleDelete = () => {
    if (deleteTarget.type === "member") {
      setProject((prev) => ({
        ...prev,
        team: prev.team.filter((member) => member._id !== deleteTarget.id),
      }));
    } else if (deleteTarget.type === "task") {
      setProject((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task._id !== deleteTarget.id),
      }));
    }
    setIsDeleteModalOpen(false);
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setProject((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-theme-light dark:bg-theme-dark justify-center items-center">
        <div className="text-para-light dark:text-para-dark">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-theme-light dark:bg-theme-dark justify-center items-center">
        <div className="text-para-light dark:text-para-dark">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-header-light dark:text-header-dark mb-4">
              {deleteTarget.type === "member"
                ? "Remove Team Member"
                : "Delete Task"}
            </h3>
            <p className="text-para-light dark:text-para-dark mb-6">
              {deleteTarget.type === "member"
                ? "Are you sure you want to remove this team member?"
                : "Are you sure you want to delete this task? This action cannot be undone."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                {deleteTarget.type === "member"
                  ? "Remove Member"
                  : "Delete Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center sm:gap-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-header-light dark:text-header-dark">
              Edit Project
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 sm:mt-2">
              Update the details of your project
            </p>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <Link
              to={`/project/view/${projectID}`}
              className="px-4 py-2 sm:px-6 sm:py-3 border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center transition-colors text-sm sm:text-base text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Project Form */}
        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Project Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Project Title*
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={project.title}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                {/* Project Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Status*
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={project.status}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Start Date*
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={project.startDate.split("T")[0]}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    End Date*
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={project.endDate.split("T")[0]}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={project.description}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the project..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Team Members
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Existing Team Members */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {project.team.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center bg-stone-100 dark:bg-stone-700 rounded-lg p-2 sm:p-3 w-full sm:w-auto"
                    >
                      <div
                        className={`${
                          member.color || MEMBER_COLORS[0]
                        } w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold`}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 truncate">
                          {member.role}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteTarget({ type: "member", id: member._id });
                          setIsDeleteModalOpen(true);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Team Member */}
                <div className="bg-stone-100 dark:bg-stone-700/50 rounded-lg p-3 sm:p-4 border border-dashed border-stone-300 dark:border-stone-600">
                  <h4 className="text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300 mb-2 sm:mb-3">
                    Add Team Member
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="memberName"
                        className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="memberName"
                        type="text"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember({ ...newMember, name: e.target.value })
                        }
                        className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Member name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="memberRole"
                        className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Role
                      </label>
                      <input
                        id="memberRole"
                        type="text"
                        value={newMember.role}
                        onChange={(e) =>
                          setNewMember({ ...newMember, role: e.target.value })
                        }
                        className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Member role"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="memberColor"
                        className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Color
                      </label>
                      <select
                        id="memberColor"
                        value={memberColor}
                        onChange={(e) => setMemberColor(e.target.value)}
                        className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {MEMBER_COLORS.map((color) => (
                          <option key={color} value={color}>
                            {color.replace("bg-", "").replace("-500", "")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-1 flex items-end">
                      <button
                        type="button"
                        onClick={addMember}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors"
                      >
                        Add Member
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Tasks
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Existing Tasks */}
                <div className="space-y-2">
                  {project.tasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center p-2 sm:p-3 bg-stone-100 dark:bg-stone-700 rounded-lg"
                    >
                      <input
                        id={`task-${task._id}`}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task._id)}
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-blue-500 focus:ring-blue-400"
                      />
                      <label
                        htmlFor={`task-${task._id}`}
                        className="ml-2 sm:ml-3 w-full text-sm sm:text-base text-stone-800 dark:text-stone-200"
                      >
                        {task.taskName}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteTarget({ type: "task", id: task._id });
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Task */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                  <button
                    type="button"
                    onClick={addTask}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-stone-200 dark:border-stone-700">
              <Link
                to={`/project/view/${projectID}`}
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center justify-center transition-colors text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
