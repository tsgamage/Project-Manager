import { useState } from "react";
import CategoryAccordion from "../components/Tasks/CategoryAccordion";
import { CheckCircle, Clock, Search, X, List, Target } from "lucide-react";

// --- FAKE DATA ---
const fakeProjects = [
  { _id: "proj1", title: "Project Phoenix" },
  { _id: "proj2", title: "Project Neptune" },
];

const fakeTaskCategories = [
  { _id: "cat1", projectId: "proj1", name: "Frontend Development", color: "#3b82f6" },
  { _id: "cat2", projectId: "proj1", name: "Backend API", color: "#10b981" },
  { _id: "cat3", projectId: "proj2", name: "UI/UX Design", color: "#8b5cf6" },
  { _id: "cat4", projectId: "proj2", name: "DevOps", color: "#f97316" },
];

const fakeTasks = [
  {
    _id: "task1",
    categoryId: "cat1",
    taskName: "Implement User Authentication",
    taskDescription: "Set up login, signup, and password reset pages.",
    completed: true,
  },
  {
    _id: "task2",
    categoryId: "cat1",
    taskName: "Build Task List UI",
    taskDescription: "Create the main tasks page with categories and tasks.",
    completed: false,
  },
  {
    _id: "task3",
    categoryId: "cat2",
    taskName: "Create Project Endpoints",
    taskDescription: "Develop API endpoints for CRUD operations on projects.",
    completed: true,
  },
  {
    _id: "task4",
    categoryId: "cat2",
    taskName: "Set up Task Model",
    taskDescription: "Define the Mongoose schema for tasks and categories.",
    completed: true,
  },
  {
    _id: "task5",
    categoryId: "cat3",
    taskName: "Design Landing Page",
    taskDescription: "Create mockups and wireframes for the landing page.",
    completed: false,
  },
  {
    _id: "task6",
    categoryId: "cat3",
    taskName: "Prototype Dashboard",
    taskDescription: "Build an interactive prototype for the main dashboard.",
    completed: false,
  },
  {
    _id: "task7",
    categoryId: "cat4",
    taskName: "Configure CI/CD Pipeline",
    taskDescription: "Use GitHub Actions to automate testing and deployment.",
    completed: false,
  },
];

// --- COMPONENTS ---

export default function TasksPage() {
  const [projects] = useState(fakeProjects);
  const [taskCategories] = useState(fakeTaskCategories);
  const [tasks, setTasks] = useState(fakeTasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("all");

  const handleTaskAction = (action, categoryId, payload) => {
    setTasks((currentTasks) => {
      if (action === "toggle") {
        return currentTasks.map((t) =>
          t._id === payload.taskId ? { ...t, completed: !t.completed } : t
        );
      }
      if (action === "delete") {
        return currentTasks.filter((t) => t._id !== payload.taskId);
      }
      if (action === "save") {
        return currentTasks.map((t) =>
          t._id === payload.taskId
            ? { ...t, taskName: payload.name, taskDescription: payload.description }
            : t
        );
      }
      return currentTasks;
    });
  };

  // Filtering logic
  const filteredCategories = taskCategories.filter((category) => {
    const project = projects.find((p) => p._id === category.projectId);
    const categoryTasks = tasks.filter((t) => t.categoryId === category._id);

    if (filterProject !== "all" && category.projectId !== filterProject) {
      return false;
    }

    const tasksToConsider = categoryTasks.filter((task) => {
      if (
        searchQuery &&
        !task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    return tasksToConsider.length > 0;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    categories: taskCategories.length,
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">All Tasks</h1>
              <div className="w-16 h-1 gradient-blue rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-gray-400">Manage and track all tasks across your projects</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-purple-400">{stats.categories}</p>
              </div>
              <List className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <CategoryAccordion
              key={category._id}
              category={category}
              tasks={tasks.filter((t) => t.categoryId === category._id)}
              projectTitle={projects.find((p) => p._id === category.projectId)?.title}
              onTaskAction={handleTaskAction}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
