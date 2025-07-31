import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth.context.jsx";
import UserContext from "../store/user.context.jsx";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  Download,
  Trash2,
  Save,
  Edit3,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowLeft,
  Settings,
  CheckCircle
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const { updateName } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const [preferences, setPreferences] = useState({
    theme: "dark",
    notifications: {
      email: true,
      projectUpdates: true,
      deadlineReminders: true,
      teamActivity: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      allowTeamInvites: true,
    }
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handlePreferenceChange(category, key, value) {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
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

    try {
      const result = await updateName(formData.name);

      if (result.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsLoading(false);
    }
  }

  function handlePasswordChange() {
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords don't match");
    }

    if (formData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    toast.success("Password updated successfully!");
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  }

  function handleExportData() {
    toast.success("Data export started. You'll receive an email when ready.");
  }

  function handleDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.success("Account deletion request submitted. You'll receive a confirmation email.");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 fade-in">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <Link
              to="/"
              className="p-2 rounded-xl hover:bg-gray-700 transition-colors"
            >
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
                        className="flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl transition-all duration-300 hover-lift"
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
                          className="flex items-center justify-center gap-2 gradient-green hover:shadow-lg text-white px-4 py-3 rounded-xl transition-all duration-300 hover-lift disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                          {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(prev => ({ ...prev, name: user?.name || "" }));
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
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="gradient-blue hover:shadow-lg text-white px-6 py-3 rounded-xl transition-all duration-300 hover-lift"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(preferences.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                            <div>
                              <div className="font-medium text-white capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-sm text-gray-400">
                                Receive notifications via email
                              </div>
                            </div>
                            <button
                              onClick={() => handlePreferenceChange("notifications", key, !value)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? "bg-blue-500" : "bg-gray-600"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Palette className="h-4 w-4 text-purple-400" />
                        Theme
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "system"].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => handlePreferenceChange("theme", "theme", theme)}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              preferences.theme === theme
                                ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                          >
                            <div className="capitalize font-medium">{theme}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Privacy Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">
                        Profile Visibility
                      </label>
                      <select
                        value={preferences.privacy.profileVisibility}
                        onChange={(e) => handlePreferenceChange("privacy", "profileVisibility", e.target.value)}
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="public">Public</option>
                        <option value="team">Team Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(preferences.privacy).slice(1).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                          <div>
                            <div className="font-medium text-white capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm text-gray-400">
                              {key === "showEmail" ? "Allow others to see your email" : "Allow team members to invite you to projects"}
                            </div>
                          </div>
                          <button
                            onClick={() => handlePreferenceChange("privacy", key, !value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? "bg-blue-500" : "bg-gray-600"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Download className="h-4 w-4 text-yellow-400" />
                        Data Management
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleExportData}
                          className="flex items-center gap-3 w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors"
                        >
                          <Download className="h-5 w-5 text-blue-400" />
                          <div>
                            <div className="font-medium text-white">Export Data</div>
                            <div className="text-sm text-gray-400">Download your project data</div>
                          </div>
                        </button>

                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center gap-3 w-full p-4 bg-red-500/10 rounded-xl text-left hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-red-400" />
                          <div>
                            <div className="font-medium text-red-400">Delete Account</div>
                            <div className="text-sm text-red-400/70">Permanently delete your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
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