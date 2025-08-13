import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth.context.jsx";
import UserContext from "../store/user.context.jsx";
import { toast } from "react-hot-toast";
import { User, Lock, Save, Edit3, Eye, EyeOff, X, ArrowLeft, Settings } from "lucide-react";

export default function SettingsPage() {
  const { user, checkAuthStatus, changePassword } = useContext(AuthContext);
  const { updateName } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPasswordChange, setIsLoadingPasswordChange] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSaveProfile() {
    if (formData.name.trim().length < 3 || formData.name.trim().length > 40) {
      return toast.error("Name must be between 3 and 40 characters");
    }

    if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
      return toast.error("Name can only contain letters and spaces");
    }

    setIsLoading(true);
    const resData = await updateName(formData.name);

    if (resData.success) {
      checkAuthStatus();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(resData.message || "Failed to update profile");
    }
    setIsLoading(false);
  }

  async function handlePasswordChange() {
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords don't match");
    }

    if (formData.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
    setIsLoadingPasswordChange(true);
    const resData = await changePassword(formData.currentPassword, formData.newPassword);

    if (resData.success) {
      toast.success(resData.message || "Password updated successfully");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      toast.error(resData.message || "Failed to update password");
    }
    setIsLoadingPasswordChange(false);
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 fade-in">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <Link to="/" className="p-2 rounded-xl hover:bg-gray-700 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </Link>
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Settings</h1>
              <p className="text-sm sm:text-base text-gray-400">Manage your account preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? "gradient-blue text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 sm:p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-400" />
                      Profile Information
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex cursor-pointer items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl transition-all duration-300 hover-lift"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-800 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        Email cannot be changed for security reasons
                      </p>
                    </div>

                    {isEditing && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="flex items-center cursor-pointer justify-center gap-2 bg-blue-500/50 hover:shadow-lg text-white px-4 py-3 rounded-xl transition-all duration-300 hover-lift disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                          {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData((prev) => ({ ...prev, name: user?.name || "" }));
                          }}
                          className="px-4 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-400" />
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      disabled={isLoadingPasswordChange}
                      className="bg-blue-500/50 cursor-pointer hover:shadow-lg text-white px-6 py-3 rounded-xl transition-all duration-300 hover-lift disabled:bg-blue-500 disabled:opacity-50"
                    >
                      {isLoadingPasswordChange ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
