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
      <div className="min-h-screen bg-gray-50 dark:bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-stone-900">
      {/* Header */}
      <div className="bg-white dark:bg-stone-800 border-b border-gray-200 dark:border-stone-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-gray-200 dark:border-stone-700 p-4 sm:p-6 mb-8 relative">
            {/* Verification Badge - Top Right Corner */}
            {user.isVerified && (
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200 dark:border-green-800 shadow-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verified</span>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 space-y-4 md:space-y-0">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>

              {/* User Info */}
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      {isEditing ? (
                        <div className="flex flex-col items-center md:items-start space-y-3">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="text-xl sm:text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white text-center md:text-left min-w-0 px-2 py-1"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
                            {user.name}
                          </h2>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 sm:p-2 bg-gray-100 hover:bg-gray-200 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-full transition-colors"
                          >
                            <Edit3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Account created {accountAge}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                  </div>
                </div>

                {/* Edit Buttons - Show when editing */}
                {isEditing && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-stone-700">
                    <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={handleSaveName}
                        className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={editedName.trim() === user.name}
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Total Projects */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalProjects}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Completed Projects */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {completedProjects}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            {/* In Progress Projects */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {inProgressProjects}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Not Started Projects */}
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Not Started
                  </p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {notStartedProjects}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <Square className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity or Additional Info */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-gray-200 dark:border-stone-700 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-stone-700">
                  <span className="text-gray-600 dark:text-gray-400">Member since</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-stone-700">
                  <span className="text-gray-600 dark:text-gray-400">Email status</span>
                  <span
                    className={`font-medium ${user.isVerified ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {user.isVerified ? "Verified" : "Not verified"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-stone-700">
                  <span className="text-gray-600 dark:text-gray-400">Last updated</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-stone-700">
                  <span className="text-gray-600 dark:text-gray-400">Account status</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
