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
    { id: "high-priority", label: "High Priority", icon: AlertCircle, color: "bg-red-500/20 text-red-300 border-red-500/30" },
    { id: "in-progress", label: "In Progress", icon: Clock, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { id: "pending", label: "Pending", icon: Circle, color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
    { id: "completed", label: "Completed", icon: CheckCircle, color: "bg-green-500/20 text-green-300 border-green-500/30" },
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
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Not Started":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
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
        return "text-red-400";
      case "urgent":
        return "text-orange-400";
      case "soon":
        return "text-yellow-400";
      case "normal":
        return "text-green-400";
      default:
        return "text-gray-400";
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                All Tasks
              </h1>
              <div className="w-16 h-1 gradient-blue rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-gray-400">
            Manage and track all tasks across your projects
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="gradient-card rounded-xl p-4 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="gradient-card rounded-xl p-4 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="gradient-card rounded-xl p-4 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="gradient-card rounded-xl p-4 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
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

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-gray-700 text-gray-400 border border-gray-600"
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
              <div key={category.id} className="glass rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {category.label}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Tasks List */}
                {isExpanded && (
                  <div className="border-t border-gray-700">
                    <div className="p-4 space-y-3">
                      {tasks.map((task) => {
                        const dueDateStatus = getDueDateStatus(task.dueDate);
                        const daysLeft = getDaysUntilDue(task.dueDate);
                        
                        return (
                          <div
                            key={`${task.projectId}-${task._id}`}
                            className={`p-4 rounded-xl border transition-all duration-200 ${
                              task.completed
                                ? "bg-green-500/10 border-green-500/30"
                                : "bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Task Checkbox */}
                              <button
                                onClick={() => handleTaskToggle(task._id, task.projectId)}
                                className={`mt-1 flex-shrink-0 ${
                                  task.completed ? "text-green-400" : "text-gray-400 hover:text-gray-300"
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
                                    <h4 className={`font-medium text-white ${
                                      task.completed ? "line-through opacity-60" : ""
                                    }`}>
                                      {task.title}
                                    </h4>
                                    
                                    {/* Project Info */}
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                      <div className="flex items-center gap-1 text-gray-400">
                                        <FolderOpen className="h-3 w-3" />
                                        <span className="truncate">{task.projectTitle}</span>
                                      </div>
                                      
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.projectStatus)}`}>
                                        {task.projectStatus}
                                      </span>
                                    </div>

                                    {/* Task Details */}
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
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
                                      <span className="text-xs text-green-400 font-medium">
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
            <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-400">
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