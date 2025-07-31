import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectContext from "../store/project.context.jsx";
import AuthContext from "../store/auth.context.jsx";
import {
  TrendingUp,
  Calendar,
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderOpen,
  Plus,
  ArrowRight,
  BarChart3,
  Activity,
  Star,
  Zap,
  Home
} from "lucide-react";

export default function HomePage() {
  const { projects } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    notStartedProjects: 0,
    overdueProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalTeamMembers: 0,
    productivityScore: 0,
    averageCompletionTime: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    calculateStats();
    updateRecentProjects();
    updateUpcomingDeadlines();
  }, [projects]);

  function calculateStats() {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(project =>
      project.tasks.length > 0 && project.tasks.every(task => task.completed)
    ).length;
    const notStartedProjects = projects.filter(project =>
      project.tasks.every(task => task.completed === false)
    ).length;
    const inProgressProjects = totalProjects - completedProjects - notStartedProjects;

    const overdueProjects = projects.filter(project => {
      if (!project.endDate) return false;
      return new Date(project.endDate) < new Date() &&
        !(project.tasks.length > 0 && project.tasks.every(task => task.completed));
    }).length;

    const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
    const completedTasks = projects.reduce((sum, project) =>
      sum + project.tasks.filter(task => task.completed).length, 0
    );

    // Get unique team members
    const allMembers = new Set();
    projects.forEach(project => {
      project.team.forEach(member => allMembers.add(member._id));
    });

    // Calculate productivity score (0-100)
    const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate average completion time (simplified)
    const completedProjectsWithDates = projects.filter(project =>
      project.tasks.length > 0 && project.tasks.every(task => task.completed) && project.startDate && project.endDate
    );

    let averageDays = 0;
    if (completedProjectsWithDates.length > 0) {
      const totalDays = completedProjectsWithDates.reduce((sum, project) => {
        const start = new Date(project.startDate);
        const end = new Date(project.endDate);
        return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      }, 0);
      averageDays = Math.round(totalDays / completedProjectsWithDates.length);
    }

    setStats({
      totalProjects,
      completedProjects,
      inProgressProjects,
      notStartedProjects,
      overdueProjects,
      totalTasks,
      completedTasks,
      totalTeamMembers: allMembers.size,
      productivityScore,
      averageCompletionTime: averageDays,
    });
  }

  function updateRecentProjects() {
    const recent = [...projects]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
    setRecentProjects(recent);
  }

  function updateUpcomingDeadlines() {
    const upcoming = projects
      .filter(project => {
        if (!project.endDate) return false;
        const deadline = new Date(project.endDate);
        const today = new Date();
        const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7 &&
          !(project.tasks.length > 0 && project.tasks.every(task => task.completed));
      })
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
      .slice(0, 5);
    setUpcomingDeadlines(upcoming);
  }

  function getProjectStatus(project) {
    if (project.tasks.length === 0) return "Not Started";
    if (project.tasks.every(task => task.completed)) return "Completed";

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.completed).length;

    if (completedTasks === 0) return "Not Started";
    if (completedTasks < totalTasks) return "In Progress";
    return "Completed";
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

  function getProgressPercentage(project) {
    if (project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  }

  function getDaysUntilDeadline(endDate) {
    if (!endDate) return null;
    const deadline = new Date(endDate);
    const today = new Date();
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-800 to-stone-600 dark:from-stone-200 dark:to-stone-400 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name || "User"}! 👋
                </h1>
                <p className="text-lg text-stone-600 dark:text-stone-400">
                  Here's what's happening with your projects today
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {stats.productivityScore}% Productive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-100 dark:border-stone-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-1">
              {stats.totalProjects}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Total Projects</p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-100 dark:border-stone-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  +{stats.completedProjects > 0 ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-1">
              {stats.completedProjects}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Completed</p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-100 dark:border-stone-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  Active
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-1">
              {stats.inProgressProjects}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm">In Progress</p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg border border-stone-100 dark:border-stone-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Team
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-1">
              {stats.totalTeamMembers}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Team Members</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Task Completion</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                {stats.completedTasks}
              </span>
              <span className="text-blue-600 dark:text-blue-400 mb-1">/ {stats.totalTasks}</span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-green-800 dark:text-green-200">Productivity</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-green-800 dark:text-green-200">
                {stats.productivityScore}%
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(stats.productivityScore / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">Avg. Completion</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                {stats.averageCompletionTime}
              </span>
              <span className="text-purple-600 dark:text-purple-400 mb-1">days</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Per project</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700">
              <div className="p-6 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
                    Recent Projects
                  </h2>
                  <Link
                    to="/projects"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderOpen className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                    <p className="text-stone-600 dark:text-stone-400 mb-4">No projects yet</p>
                    <Link
                      to="/add-project"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Create First Project
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project._id} className="group hover:bg-stone-50 dark:hover:bg-stone-700 rounded-xl p-4 transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getProjectStatus(project))}`}>
                            {getProjectStatus(project)}
                          </span>
                        </div>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
                          {project.description || "No description available"}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {project.team.length} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {project.tasks.length} tasks
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-stone-200 dark:bg-stone-600 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getProgressPercentage(project)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                              {getProgressPercentage(project)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-6">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/add-project"
                  className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800 dark:text-stone-200">New Project</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400">Create a new project</p>
                  </div>
                </Link>

                <Link
                  to="/teams"
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800 dark:text-stone-200">Manage Team</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400">View team members</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-6">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
                Upcoming Deadlines
              </h3>
              {upcomingDeadlines.length === 0 ? (
                <p className="text-sm text-stone-600 dark:text-stone-400">No upcoming deadlines</p>
              ) : (
                <div className="space-y-3">
                  {upcomingDeadlines.map((project) => {
                    const daysLeft = getDaysUntilDeadline(project.endDate);
                    return (
                      <div key={project._id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <div>
                          <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                            {project.title}
                          </p>
                          <p className="text-xs text-stone-600 dark:text-stone-400">
                            Due {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-bold ${daysLeft === 0 ? 'text-red-600 dark:text-red-400' :
                              daysLeft <= 2 ? 'text-orange-600 dark:text-orange-400' :
                                'text-yellow-600 dark:text-yellow-400'
                            }`}>
                            {daysLeft === 0 ? 'Today' : `${daysLeft}d left`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Project Status Overview */}
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-6">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
                Project Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Completed</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{stats.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">In Progress</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.inProgressProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Not Started</span>
                  <span className="font-semibold text-stone-600 dark:text-stone-400">{stats.notStartedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-400">Overdue</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">{stats.overdueProjects}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
