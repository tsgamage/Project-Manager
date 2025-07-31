import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import ProjectContext from "../store/project.context.jsx";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  Target, 
  TrendingUp,
  Edit3,
  MoreVertical,
  Share2,
  Download,
  Trash2,
  Star,
  Zap,
  Award,
  Activity,
  FolderOpen,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import useProgress from "../hooks/useProgress.jsx";
import useStatusClasses from "../hooks/useStatusClasses.jsx";
import ProjectTasks from "../components/ViewProject/Task/ProjectTasks.jsx";
import TeamMembers from "../components/ViewProject/Member/TeamMembers.jsx";
import EditProjectModal from "../components/UI/Modals/EditProjectModal.jsx";

export default function ViewProjectPage() {
  const params = useParams();
  const { setSelectedProjectID, selectedProject, updateProject } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState("tasks");
  const editModalRef = useRef();

  useEffect(() => {
    setSelectedProjectID(params.projectID);
  }, [params.projectID, setSelectedProjectID]);

  const progress = useProgress(selectedProject);
  const { status, statusClasses } = useStatusClasses(progress);

  if (!selectedProject || selectedProject._id !== params.projectID) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }
  
  // Calculate days remaining
  const endDate = new Date(selectedProject.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  // Calculate statistics
  const totalTasks = selectedProject.tasks.length;
  const completedTasks = selectedProject.tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const teamSize = selectedProject.team.length;
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tabs = [
    { id: "tasks", label: "Tasks", icon: Target, count: totalTasks },
    { id: "team", label: "Team", icon: Users, count: teamSize },
    { id: "overview", label: "Overview", icon: Activity },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const handleEditProject = async (updatedData) => {
    try {
      await updateProject({
        ...selectedProject,
        ...updatedData
      });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <EditProjectModal
        ref={editModalRef}
        project={selectedProject}
        onClose={() => editModalRef.current?.close()}
        onSave={handleEditProject}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-green-500 to-blue-600 rounded-full translate-y-32 -translate-x-32"></div>
          </div>

          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Link
                  to="/project/all"
                  className="p-2 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-400" />
                </Link>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusClasses}`}>
                      {status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      daysRemaining > 0 
                        ? daysRemaining < 7 
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : daysRemaining < 14 
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                    }`}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
                  <Share2 className="h-5 w-5 text-gray-300" />
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
                  <Download className="h-5 w-5 text-gray-300" />
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-300" />
                </button>
                <button 
                  onClick={() => editModalRef.current?.open()}
                  className="flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl transition-all duration-300 hover-lift"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Project</span>
                </button>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                <div>
                  <p className="text-gray-400 mb-2">
                    {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">{progress || 0}%</span>
                    <span className="text-gray-400">Complete</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{totalTasks}</div>
                    <div className="text-sm text-gray-400">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{completedTasks}</div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{teamSize}</div>
                    <div className="text-sm text-gray-400">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{productivityScore}%</div>
                    <div className="text-sm text-gray-400">Productivity</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    progress < 30 ? "bg-gradient-to-r from-red-400 to-red-500" : 
                    progress < 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : 
                    "bg-gradient-to-r from-green-400 to-green-500"
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed max-w-4xl">
                {selectedProject.description || "No description available for this project."}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-blue rounded-xl flex items-center justify-center">
                  <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{totalTasks}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Total Tasks</p>
            </div>

            <div className="gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-green rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-xs text-green-400 font-medium">
                    +{completedTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                  </span>
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{completedTasks}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Completed</p>
            </div>

            <div className="gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-xs text-yellow-400 font-medium">Pending</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{pendingTasks}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Remaining</p>
            </div>

            <div className="gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-xs text-purple-400 font-medium">Team</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{teamSize}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Team Members</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "gradient-blue text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="bg-gray-800/50 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {activeTab === "tasks" && (
            <ProjectTasks tasks={selectedProject.tasks} />
          )}

          {activeTab === "team" && (
            <TeamMembers team={selectedProject.team} />
          )}

          {activeTab === "overview" && (
            <div className="glass rounded-2xl shadow-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Project Overview
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Task completed</p>
                        <p className="text-gray-400 text-sm">Frontend development task was completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Team member added</p>
                        <p className="text-gray-400 text-sm">John Doe joined the project</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Project Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">Start Date</span>
                      <span className="text-white">{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">End Date</span>
                      <span className="text-white">{new Date(selectedProject.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses}`}>
                        {status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{progress || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="glass rounded-2xl shadow-lg border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Project Analytics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Task Completion Trend</h4>
                  <div className="h-48 bg-gray-700/50 rounded-xl flex items-center justify-center">
                    <p className="text-gray-400">Chart placeholder</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Team Performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                      <span className="text-white">Task Completion Rate</span>
                      <span className="text-green-400 font-semibold">{productivityScore}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                      <span className="text-white">Days Remaining</span>
                      <span className="text-blue-400 font-semibold">{daysRemaining}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                      <span className="text-white">Team Size</span>
                      <span className="text-purple-400 font-semibold">{teamSize}</span>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
