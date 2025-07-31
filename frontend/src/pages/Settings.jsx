import { useContext, useState } from "react";
import AuthContext from "../store/auth.context.jsx";
import UserContext from "../store/user.context.jsx";
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
  Edit,
  Eye,
  EyeOff,
  Check,
  X,
  FolderOpen,
  Settings
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
    theme: "system",
    notifications: {
      email: true,
      push: true,
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

  const [message, setMessage] = useState({ type: "", text: "" });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Palette },
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
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await updateName(formData.name);

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: result.message || "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while updating profile" });
    } finally {
      setIsLoading(false);
    }
  }

  function handlePasswordChange() {
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords don't match" });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" });
      return;
    }

    setMessage({ type: "success", text: "Password updated successfully!" });
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  }

  function handleExportData() {
    // Simulate data export
    setMessage({ type: "success", text: "Data export started. You'll receive an email when ready." });
  }

  function handleDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setMessage({ type: "success", text: "Account deletion request submitted. You'll receive a confirmation email." });
    }
  }

  function clearMessage() {
    setMessage({ type: "", text: "" });
  }

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-2">
              Settings
            </h1></div>
          <p className="text-stone-600 dark:text-stone-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${message.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700"
            }`}>
            <div className="flex items-center gap-3">
              {message.type === "success" ? (
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              <span className={`font-medium ${message.type === "success"
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
                }`}>
                {message.text}
              </span>
            </div>
            <button
              onClick={clearMessage}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700"
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
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700 p-6">

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
                      Profile Information
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 disabled:bg-stone-50 dark:disabled:bg-stone-800 disabled:text-stone-500 dark:disabled:text-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                      />
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                        Email cannot be changed for security reasons
                      </p>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                          {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(prev => ({ ...prev, name: user?.name || "" }));
                          }}
                          className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
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
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pr-12 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pr-12 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pr-12 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                    App Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "system"].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => handlePreferenceChange("theme", "theme", theme)}
                            className={`p-4 rounded-lg border transition-colors ${preferences.theme === theme
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                : "border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700"
                              }`}
                          >
                            <div className="capitalize font-medium">{theme}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        Data Management
                      </label>
                      <div className="space-y-3">
                        <button
                          onClick={handleExportData}
                          className="flex items-center gap-3 w-full p-4 border border-stone-300 dark:border-stone-600 rounded-lg text-left hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                        >
                          <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="font-medium text-stone-800 dark:text-stone-200">Export Data</div>
                            <div className="text-sm text-stone-600 dark:text-stone-400">Download your project data</div>
                          </div>
                        </button>

                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center gap-3 w-full p-4 border border-red-300 dark:border-red-600 rounded-lg text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <div>
                            <div className="font-medium text-red-800 dark:text-red-200">Delete Account</div>
                            <div className="text-sm text-red-600 dark:text-red-400">Permanently delete your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(preferences.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-sm text-stone-600 dark:text-stone-400">
                                Receive notifications via email
                              </div>
                            </div>
                            <button
                              onClick={() => handlePreferenceChange("notifications", key, !value)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-blue-600" : "bg-stone-300 dark:bg-stone-600"
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"
                                  }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                    Privacy Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        Profile Visibility
                      </label>
                      <select
                        value={preferences.privacy.profileVisibility}
                        onChange={(e) => handlePreferenceChange("privacy", "profileVisibility", e.target.value)}
                        className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
                      >
                        <option value="public">Public</option>
                        <option value="team">Team Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(preferences.privacy).slice(1).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm text-stone-600 dark:text-stone-400">
                              {key === "showEmail" ? "Allow others to see your email" : "Allow team members to invite you to projects"}
                            </div>
                          </div>
                          <button
                            onClick={() => handlePreferenceChange("privacy", key, !value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-blue-600" : "bg-stone-300 dark:bg-stone-600"
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"
                                }`}
                            />
                          </button>
                        </div>
                      ))}
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