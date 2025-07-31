import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth.context.jsx";
import ProjectContext from "../store/project.context.jsx";
import UserContext from "../store/user.context.jsx";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  ArrowLeft,
  Briefcase,
  CheckSquare,
  Square,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";

export default function Profile() {
  const { user, checkAuthStatus } = useContext(AuthContext);
  const { projects } = useContext(ProjectContext);
  const { updateName } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "User");

  // Calculate account age
  const createdAtIndays =
    user?.createdAt && Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));
  const createtAtInHours =
    user?.createdAt && Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60));
  let accountAge;

  if (createdAtIndays > 0) {
    accountAge = `${createdAtIndays} days and ${createtAtInHours - createdAtIndays * 24} hours ago`;
  } else if (createdAtIndays === 0) {
    accountAge = `${createtAtInHours - createdAtIndays * 24} hours ago`;
  } else if (createtAtInHours < 1) {
    accountAge = "Less than an hour ago";
  }

  // Calculate project statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (project) => project.tasks.length > 0 && project.tasks.every((task) => task.completed)
  ).length;
  const inProgressProjects = projects.filter((project) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((task) => task.completed).length;
    return totalTasks > 0 && completedTasks > 0 && completedTasks < totalTasks;
  }).length;
  const notStartedProjects = projects.filter(
    (project) => project.tasks.length === 0 || project.tasks.every((task) => !task.completed)
  ).length;

  // Calculate achievements
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
  const completedTasks = projects.reduce((sum, project) => 
    sum + project.tasks.filter(task => task.completed).length, 0
  );
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format last login time
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return "Never";
    const now = new Date();
    const loginTime = new Date(lastLogin);
    const diffInHours = Math.floor((now - loginTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return loginTime.toLocaleDateString();
  };

  const handleSaveName = async () => {
    if (editedName.trim().length < 3 || editedName.trim().length > 40) {
      return toast.error("Invalid Name");
    }

    if (editedName && !/^[a-zA-Z\s]+$/.test(editedName)) {
      return toast.error("Name can only contain letters and spaces");
    }

    const response = await updateName(editedName);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    checkAuthStatus();
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name || "User");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                className="p-2 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Profile</h1>
                <p className="text-sm sm:text-base text-gray-400">Manage your account</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass rounded-xl p-3 shadow-lg border border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {productivityScore}% Productive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="gradient-card rounded-2xl shadow-lg border border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
          </div>

          <div className="relative z-10">
            {/* Verification Badge */}
            {user.isVerified && (
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <div className="flex items-center gap-1 sm:gap-2 bg-green-500/20 text-green-300 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Verified</span>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-blue rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-gray-900 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center w-full">
                <div className="mb-4">
                  {isEditing ? (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-white text-center min-w-0 px-2 py-1"
                        autoFocus
                      />
                      <div className="flex gap-2 sm:gap-3">
                        <button
                          onClick={handleSaveName}
                          className="px-3 sm:px-4 py-2 gradient-green hover:shadow-lg text-white font-medium rounded-xl transition-all duration-300 hover-lift text-sm sm:text-base"
                          disabled={editedName.trim() === user.name}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-all duration-300 text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {user.name}
                      </h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300 hover-lift"
                      >
                        <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {accountAge}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="gradient-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-blue rounded-lg sm:rounded-xl flex items-center justify-center">
                <Briefcase className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{totalProjects}</h3>
            <p className="text-xs sm:text-sm text-gray-400">Total Projects</p>
          </div>

          <div className="gradient-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-green rounded-lg sm:rounded-xl flex items-center justify-center">
                <CheckSquare className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-green-400 font-medium">
                  +{completedProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
                </span>
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{completedProjects}</h3>
            <p className="text-xs sm:text-sm text-gray-400">Completed</p>
          </div>

          <div className="gradient-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-yellow-400 font-medium">Active</span>
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{inProgressProjects}</h3>
            <p className="text-xs sm:text-sm text-gray-400">In Progress</p>
          </div>

          <div className="gradient-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-medium">Tasks</span>
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{completedTasks}</h3>
            <p className="text-xs sm:text-sm text-gray-400">Completed Tasks</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700">
                <span className="text-sm sm:text-base text-gray-400">Member since</span>
                <span className="font-medium text-white text-sm sm:text-base">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700">
                <span className="text-sm sm:text-base text-gray-400">Email status</span>
                <span className={`font-medium text-sm sm:text-base ${user.isVerified ? "text-green-400" : "text-red-400"}`}>
                  {user.isVerified ? "Verified" : "Not verified"}
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700">
                <span className="text-sm sm:text-base text-gray-400">Last updated</span>
                <span className="font-medium text-white text-sm sm:text-base">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700">
                <span className="text-sm sm:text-base text-gray-400">Account status</span>
                <span className="font-medium text-green-400 text-sm sm:text-base">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
