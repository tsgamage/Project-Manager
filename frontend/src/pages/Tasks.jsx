import { useContext, useState, useEffect } from "react";
import ProjectContext from "../store/project.context.jsx";
import { 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronRight,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  FolderOpen,
  Search,
  Filter,
  Check,
  X,
  Star,
  Target,
  Zap
} from "lucide-react";

export default function TasksPage() {
  const { projects } = useContext(ProjectContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState("priority"); // priority, dueDate, project

  // Task categories
  const taskCategories = [
    { id: "high-priority", label: "High Priority", icon: AlertCircle, color: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400" },
    { id: "in-progress", label: "In Progress", icon: Clock, color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400" },
    { id: "pending", label: "Pending", icon: Circle, color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400" },
    { id: "completed", label: "Completed", icon: CheckCircle, color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400" },
  ];

  // Extract all tasks from projects and categorize them
  const allTasks = projects.flatMap(project => 
    project.tasks.map(task => ({
      ...task,
      projectId: project._id,
      projectTitle: project.title,
      projectStatus: getProjectStatus(project),
      projectTeam: project.team,
      projectStartDate: project.startDate,
      projectEndDate: project.endDate,
    }))
  );

  function getProjectStatus(project) {
    if (project.tasks.length === 0) return "Not Started";
    if (project.tasks.every(task => task.completed)) return "Completed";
    
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.completed).length;
    
    if (completedTasks === 0) return "Not Started";
    if (completedTasks < totalTasks) return "In Progress";
    return "Completed";
  }

  function getTaskCategory(task) {
    if (task.completed) return "completed";
    if (task.priority === "high") return "high-priority";
    if (task.inProgress) return "in-progress";
    return "pending";
  }

  function getStatusColor(status) {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      case "In Progress":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400";
      case "Not Started":
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
      default:
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      default:
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
    }
  }

  function getPriorityIcon(priority) {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4" />;
      case "medium":
        return <Clock className="h-4 w-4" />;
      case "low":
        return <Circle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  }

  function toggleCategory(categoryId) {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  }

  function handleTaskToggle(taskId, projectId) {
    // In a real app, you would call an API to update the task
    console.log(`Toggling task ${taskId} in project ${projectId}`);
  }

  function filterTasks(tasks) {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(task => getTaskCategory(task) === filterStatus);
    }

    // Apply project filter
    if (filterProject !== "all") {
      filtered = filtered.filter(task => task.projectId === filterProject);
    }

    // Apply completed filter
    if (!showCompleted) {
      filtered = filtered.filter(task => !task.completed);
    }

    return filtered;
  }

  function sortTasks(tasks) {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "project":
          return a.projectTitle.localeCompare(b.projectTitle);
        default:
          return 0;
      }
    });
  }

  function formatDate(date) {
    if (!date) return "No due date";
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }

  function getDaysUntilDue(dueDate) {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function getDueDateStatus(dueDate) {
    if (!dueDate) return "no-due-date";
    const daysLeft = getDaysUntilDue(dueDate);
    if (daysLeft < 0) return "overdue";
    if (daysLeft <= 3) return "urgent";
    if (daysLeft <= 7) return "soon";
    return "normal";
  }

  function getDueDateColor(status) {
    switch (status) {
      case "overdue":
        return "text-red-600 dark:text-red-400";
      case "urgent":
        return "text-orange-600 dark:text-orange-400";
      case "soon":
        return "text-yellow-600 dark:text-yellow-400";
      case "normal":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-stone-500 dark:text-stone-400";
    }
  }

  const filteredTasks = filterTasks(allTasks);
  const sortedTasks = sortTasks(filteredTasks);

  // Group tasks by category
  const tasksByCategory = taskCategories.reduce((acc, category) => {
    acc[category.id] = sortedTasks.filter(task => getTaskCategory(task) === category.id);
    return acc;
  }, {});

  // Calculate statistics
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(task => task.completed).length,
    pending: allTasks.filter(task => !task.completed).length,
    highPriority: allTasks.filter(task => task.priority === "high" && !task.completed).length,
  };

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">
              All Tasks
            </h1>
          </div>
          <p className="text-stone-600 dark:text-stone-400">
            Manage and track all tasks across your projects
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Total Tasks</p>
                <p className="text-2xl font-bold text-stone-800 dark:text-stone-200">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">High Priority</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.highPriority}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search tasks or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
              >
                <option value="all">All Status</option>
                <option value="high-priority">High Priority</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Project Filter */}
            <div>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
              >
                <option value="priority">Sort by Priority</option>
                <option value="dueDate">Sort by Due Date</option>
                <option value="project">Sort by Project</option>
              </select>
            </div>
          </div>

          {/* Toggle Completed Tasks */}
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                showCompleted
                  ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : "bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              {showCompleted ? "Hide" : "Show"} Completed
            </button>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="space-y-4">
          {taskCategories.map((category) => {
            const tasks = tasksByCategory[category.id];
            const isExpanded = expandedCategories.has(category.id);
            const Icon = category.icon;

            if (tasks.length === 0) return null;

            return (
              <div key={category.id} className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                        {category.label}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-stone-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-stone-400" />
                    )}
                  </div>
                </button>

                {/* Tasks List */}
                {isExpanded && (
                  <div className="border-t border-stone-200 dark:border-stone-700">
                    <div className="p-4 space-y-3">
                      {tasks.map((task) => {
                        const dueDateStatus = getDueDateStatus(task.dueDate);
                        const daysLeft = getDaysUntilDue(task.dueDate);
                        
                        return (
                          <div
                            key={`${task.projectId}-${task._id}`}
                            className={`p-4 rounded-xl border transition-all duration-200 ${
                              task.completed
                                ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700"
                                : "bg-stone-50 dark:bg-stone-700/50 border-stone-200 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Task Checkbox */}
                              <button
                                onClick={() => handleTaskToggle(task._id, task.projectId)}
                                className={`mt-1 flex-shrink-0 ${
                                  task.completed ? "text-green-600 dark:text-green-400" : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                                }`}
                              >
                                {task.completed ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>

                              {/* Task Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h4 className={`font-medium text-stone-800 dark:text-stone-200 ${
                                      task.completed ? "line-through opacity-60" : ""
                                    }`}>
                                      {task.title}
                                    </h4>
                                    
                                    {/* Project Info */}
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                      <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
                                        <FolderOpen className="h-3 w-3" />
                                        <span className="truncate">{task.projectTitle}</span>
                                      </div>
                                      
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.projectStatus)}`}>
                                        {task.projectStatus}
                                      </span>
                                    </div>

                                    {/* Task Details */}
                                    <div className="flex items-center gap-4 mt-2 text-sm text-stone-500 dark:text-stone-400">
                                      {/* Priority */}
                                      <div className="flex items-center gap-1">
                                        {getPriorityIcon(task.priority)}
                                        <span className="capitalize">{task.priority || "low"} priority</span>
                                      </div>

                                      {/* Due Date */}
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span className={getDueDateColor(dueDateStatus)}>
                                          {formatDate(task.dueDate)}
                                          {daysLeft !== null && daysLeft < 0 && ` (${Math.abs(daysLeft)} days overdue)`}
                                          {daysLeft !== null && daysLeft >= 0 && daysLeft <= 7 && ` (${daysLeft} days left)`}
                                        </span>
                                      </div>

                                      {/* Team Members */}
                                      <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>{task.projectTeam.length} members</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {task.completed && (
                                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-stone-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
              No tasks found
            </h3>
            <p className="text-stone-600 dark:text-stone-400">
              {searchQuery || filterStatus !== "all" || filterProject !== "all"
                ? "Try adjusting your search or filters"
                : "Create some tasks in your projects to get started"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}