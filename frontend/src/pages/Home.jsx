import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectContext from "../store/project.context.jsx";
import {
  TrendingUp,
  Calendar,
  Users,
  Target,
  CheckCircle,
  Clock,
  FolderOpen,
  Plus,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const user = useSelector((state) => state.auth.user);
  
  const { projects } = useContext(ProjectContext);
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

  const calculateStats = useCallback(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (project) => project.tasks.length > 0 && project.tasks.every((task) => task.completed)
    ).length;
    const notStartedProjects = projects.filter((project) =>
      project.tasks.every((task) => task.completed === false)
    ).length;
    const inProgressProjects = totalProjects - completedProjects - notStartedProjects;

    const overdueProjects = projects.filter((project) => {
      if (!project.endDate) return false;
      return (
        new Date(project.endDate) < new Date() &&
        !(project.tasks.length > 0 && project.tasks.every((task) => task.completed))
      );
    }).length;

    const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
    const completedTasks = projects.reduce(
      (sum, project) => sum + project.tasks.filter((task) => task.completed).length,
      0
    );

    // Get unique team members
    const allMembers = new Set();
    projects.forEach((project) => {
      project.team.forEach((member) => allMembers.add(member._id));
    });

    // Calculate productivity score (0-100)
    const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate average completion time (simplified)
    const completedProjectsWithDates = projects.filter(
      (project) =>
        project.tasks.length > 0 &&
        project.tasks.every((task) => task.completed) &&
        project.startDate &&
        project.endDate
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
  }, [projects]);

  const updateRecentProjects = useCallback(() => {
    const recent = [...projects]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
    setRecentProjects(recent);
  }, [projects]);

  const updateUpcomingDeadlines = useCallback(() => {
    const upcoming = projects
      .filter((project) => {
        if (!project.endDate) return false;
        const deadline = new Date(project.endDate);
        const today = new Date();
        const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return (
          diffDays >= 0 &&
          diffDays <= 7 &&
          !(project.tasks.length > 0 && project.tasks.every((task) => task.completed))
        );
      })
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
      .slice(0, 5);
    setUpcomingDeadlines(upcoming);
  }, [projects]);

  useEffect(() => {
    calculateStats();
    updateRecentProjects();
    updateUpcomingDeadlines();
  }, [projects, user, calculateStats, updateRecentProjects, updateUpcomingDeadlines]);

  function getProjectStatus(project) {
    if (project.tasks.length === 0) return "Not Started";
    if (project.tasks.every((task) => task.completed)) return "Completed";

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((task) => task.completed).length;

    if (completedTasks === 0) return "Not Started";
    if (completedTasks < totalTasks) return "In Progress";
    return "Completed";
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

  function getProgressPercentage(project) {
    if (project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter((task) => task.completed).length;
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-2 sm:p-6">
        {/* Welcome Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome back, {user?.name || "User"}! 👋
                </h1>
                <p className="text-lg text-gray-400">
                  Here's what's happening with your projects today
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="glass rounded-xl p-4 shadow-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">
                    {stats.productivityScore}% Productive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="gradient-card rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalProjects}</h3>
            <p className="text-gray-400 text-sm">Total Projects</p>
          </div>

          <div className="gradient-card rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-green-400 font-medium">
                  +
                  {stats.completedProjects > 0
                    ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.completedProjects}</h3>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>

          <div className="gradient-card rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-yellow-400 font-medium">Active</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.inProgressProjects}</h3>
            <p className="text-gray-400 text-sm">In Progress</p>
          </div>

          <div className="gradient-card rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-medium">Team</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalTeamMembers}</h3>
            <p className="text-gray-400 text-sm">Team Members</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="glass rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Task Completion</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.completedTasks}</span>
              <span className="text-blue-400 mb-1">/ {stats.totalTasks}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="gradient-blue h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white">Productivity</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.productivityScore}%</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(stats.productivityScore / 20) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                />
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-purple-400" />
              <h3 className="font-semibold text-white">Avg. Completion</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{stats.averageCompletionTime}</span>
              <span className="text-purple-400 mb-1">days</span>
            </div>
            <p className="text-sm text-purple-400 mt-1">Per project</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl shadow-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                  <Link
                    to="/project/all"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-3">
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 mb-4">No projects yet</p>
                    <Link
                      to="/project/new"
                      className="inline-flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl transition-all duration-300 hover-lift"
                    >
                      <Plus className="h-4 w-4" />
                      Create First Project
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <Link key={project._id} to={`/project/view/${project._id}`}>
                        <div className="group hover:bg-gray-700/50 sm:rounded-xl max-sm:py-5 p-3 sm:p-6 max-sm:border-y-1 max-sm:border-stone-500/20 transition-all duration-200 ">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                              {project.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(getProjectStatus(project))}`}
                            >
                              {getProjectStatus(project)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2 truncate">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
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
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div
                                  className="gradient-blue h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${getProgressPercentage(project)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-400">
                                {getProgressPercentage(project)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass rounded-2xl shadow-lg border border-gray-700 max-sm:p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/project/new"
                  className="flex items-center gap-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">New Project</p>
                    <p className="text-xs text-gray-400">Create a new project</p>
                  </div>
                </Link>

                <Link
                  to="/team/members"
                  className="flex items-center gap-3 p-3 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Manage Team</p>
                    <p className="text-xs text-gray-400">View team members</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="glass rounded-2xl shadow-lg border border-gray-700 max-sm:p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
              {upcomingDeadlines.length === 0 ? (
                <p className="text-sm text-gray-400">No upcoming deadlines</p>
              ) : (
                <div className="space-y-3">
                  {upcomingDeadlines.map((project) => {
                    const daysLeft = getDaysUntilDeadline(project.endDate);
                    return (
                      <div
                        key={project._id}
                        className="flex items-center justify-between p-3 bg-red-500/10 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-white text-sm">{project.title}</p>
                          <p className="text-xs text-gray-400">
                            Due {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-sm font-bold ${
                              daysLeft === 0
                                ? "text-red-400"
                                : daysLeft <= 2
                                  ? "text-orange-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {daysLeft === 0 ? "Today" : `${daysLeft}d left`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Project Status Overview */}
            <div className="glass rounded-2xl shadow-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Completed</span>
                  <span className="font-semibold text-green-400">{stats.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">In Progress</span>
                  <span className="font-semibold text-blue-400">{stats.inProgressProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Not Started</span>
                  <span className="font-semibold text-gray-400">{stats.notStartedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Overdue</span>
                  <span className="font-semibold text-red-400">{stats.overdueProjects}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
