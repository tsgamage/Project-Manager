import { useContext, useState, useEffect } from "react";
import ProjectContext from "../store/project.context.jsx";
import { 
  Trash2, 
  RotateCcw, 
  Users, 
  FolderOpen, 
  Calendar, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  X,
  Search,
  Filter,
  Mail
} from "lucide-react";

export default function TrashPage() {
  const { projects } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToRestore, setItemToRestore] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Mock deleted data - in a real app, this would come from your backend
  const [deletedProjects, setDeletedProjects] = useState([
    {
      _id: "1",
      title: "Website Redesign",
      description: "Complete redesign of company website",
      deletedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      deletedBy: "John Doe",
      team: [
        { _id: "1", name: "Alice", role: "Designer" },
        { _id: "2", name: "Bob", role: "Developer" }
      ],
      tasks: [
        { _id: "1", title: "Design mockups", completed: true },
        { _id: "2", title: "Frontend development", completed: false }
      ]
    },
    {
      _id: "2",
      title: "Mobile App Development",
      description: "iOS and Android app for customer portal",
      deletedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      deletedBy: "Jane Smith",
      team: [
        { _id: "3", name: "Charlie", role: "Mobile Developer" }
      ],
      tasks: [
        { _id: "3", title: "UI/UX Design", completed: true },
        { _id: "4", title: "iOS Development", completed: false },
        { _id: "5", title: "Android Development", completed: false }
      ]
    }
  ]);

  const [deletedMembers, setDeletedMembers] = useState([
    {
      _id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Senior Designer",
      deletedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      deletedBy: "John Doe",
      assignedProjects: ["Website Redesign", "Brand Guidelines"]
    },
    {
      _id: "2",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Frontend Developer",
      deletedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      deletedBy: "Jane Smith",
      assignedProjects: ["Website Redesign"]
    }
  ]);

  const tabs = [
    { id: "projects", label: "Deleted Projects", icon: FolderOpen, count: deletedProjects.length },
    { id: "members", label: "Deleted Members", icon: Users, count: deletedMembers.length },
  ];

  function getDaysUntilPermanentDeletion(deletedAt) {
    const thirtyDaysFromDeletion = new Date(deletedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diffTime = thirtyDaysFromDeletion - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  function getDeletionStatus(deletedAt) {
    const daysLeft = getDaysUntilPermanentDeletion(deletedAt);
    if (daysLeft === 0) return "expired";
    if (daysLeft <= 3) return "critical";
    if (daysLeft <= 7) return "warning";
    return "safe";
  }

  function getStatusColor(status) {
    switch (status) {
      case "expired":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
      case "critical":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400";
      case "warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
      case "safe":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      default:
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "expired":
        return "Permanently Deleted";
      case "critical":
        return "Critical";
      case "warning":
        return "Warning";
      case "safe":
        return "Safe";
      default:
        return "Unknown";
    }
  }

  function filterItems(items) {
    let filtered = items;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(item => {
        const status = getDeletionStatus(item.deletedAt);
        return status === filterType;
      });
    }

    return filtered;
  }

  function handleRestore(item) {
    setItemToRestore(item);
    setShowConfirmRestore(true);
  }

  function handlePermanentDelete(item) {
    setItemToDelete(item);
    setShowConfirmDelete(true);
  }

  function confirmRestore() {
    if (activeTab === "projects") {
      setDeletedProjects(prev => prev.filter(p => p._id !== itemToRestore._id));
      // In a real app, you would call an API to restore the project
    } else {
      setDeletedMembers(prev => prev.filter(m => m._id !== itemToRestore._id));
      // In a real app, you would call an API to restore the member
    }
    setShowConfirmRestore(false);
    setItemToRestore(null);
  }

  function confirmPermanentDelete() {
    if (activeTab === "projects") {
      setDeletedProjects(prev => prev.filter(p => p._id !== itemToDelete._id));
      // In a real app, you would call an API to permanently delete
    } else {
      setDeletedMembers(prev => prev.filter(m => m._id !== itemToDelete._id));
      // In a real app, you would call an API to permanently delete
    }
    setShowConfirmDelete(false);
    setItemToDelete(null);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  const filteredProjects = filterItems(deletedProjects);
  const filteredMembers = filterItems(deletedMembers);

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200">
              Trash
            </h1>
          </div>
          <p className="text-stone-600 dark:text-stone-400">
            Restore deleted projects and team members. Items are permanently deleted after 30 days.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Important Notice
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Deleted items are automatically permanently removed after 30 days. Make sure to restore any important items before they expire.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-stone-100 dark:bg-stone-700 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  <span className="bg-stone-200 dark:bg-stone-600 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search deleted items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200"
          >
            <option value="all">All Items</option>
            <option value="safe">Safe (7+ days left)</option>
            <option value="warning">Warning (3-7 days left)</option>
            <option value="critical">Critical (1-3 days left)</option>
            <option value="expired">Expired (0 days left)</option>
          </select>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700">
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                Deleted Projects
              </h2>
              
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-600 dark:text-stone-400">
                    {searchQuery || filterType !== "all" 
                      ? "No projects match your search criteria" 
                      : "No deleted projects found"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => {
                    const status = getDeletionStatus(project.deletedAt);
                    const daysLeft = getDaysUntilPermanentDeletion(project.deletedAt);
                    
                    return (
                      <div key={project._id} className="border border-stone-200 dark:border-stone-700 rounded-xl p-4 sm:p-6 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                                {project.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(status)}`}>
                                {getStatusText(status)}
                              </span>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 mb-3">
                              {project.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-stone-500 dark:text-stone-400">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {project.team.length} members
                              </span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4" />
                                {project.tasks.filter(t => t.completed).length}/{project.tasks.length} tasks completed
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Deleted {formatDate(project.deletedAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            {status !== "expired" && (
                              <button
                                onClick={() => handleRestore(project)}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                                <span className="hidden sm:inline">Restore</span>
                                <span className="sm:hidden">Restore</span>
                              </button>
                            )}
                            <button
                              onClick={() => handlePermanentDelete(project)}
                              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Delete Permanently</span>
                              <span className="sm:hidden">Delete</span>
                            </button>
                          </div>
                        </div>
                        
                        {daysLeft > 0 && (
                          <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                            <Clock className="h-4 w-4" />
                            <span>
                              {daysLeft === 1 
                                ? "1 day left before permanent deletion" 
                                : `${daysLeft} days left before permanent deletion`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-6">
                Deleted Team Members
              </h2>
              
              {filteredMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-600 dark:text-stone-400">
                    {searchQuery || filterType !== "all" 
                      ? "No members match your search criteria" 
                      : "No deleted members found"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMembers.map((member) => {
                    const status = getDeletionStatus(member.deletedAt);
                    const daysLeft = getDaysUntilPermanentDeletion(member.deletedAt);
                    
                    return (
                      <div key={member._id} className="border border-stone-200 dark:border-stone-700 rounded-xl p-4 sm:p-6 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                    {member.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                                    {member.name}
                                  </h3>
                                  <p className="text-stone-600 dark:text-stone-400">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(status)}`}>
                                {getStatusText(status)}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-stone-500 dark:text-stone-400">
                              <span className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {member.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <FolderOpen className="h-4 w-4" />
                                {member.assignedProjects.length} projects
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Deleted {formatDate(member.deletedAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            {status !== "expired" && (
                              <button
                                onClick={() => handleRestore(member)}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                                <span className="hidden sm:inline">Restore</span>
                                <span className="sm:hidden">Restore</span>
                              </button>
                            )}
                            <button
                              onClick={() => handlePermanentDelete(member)}
                              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Delete Permanently</span>
                              <span className="sm:hidden">Delete</span>
                            </button>
                          </div>
                        </div>
                        
                        {daysLeft > 0 && (
                          <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                            <Clock className="h-4 w-4" />
                            <span>
                              {daysLeft === 1 
                                ? "1 day left before permanent deletion" 
                                : `${daysLeft} days left before permanent deletion`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Modals */}
        {showConfirmRestore && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 sm:p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
                Restore {activeTab === "projects" ? "Project" : "Member"}?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                Are you sure you want to restore "{itemToRestore?.title || itemToRestore?.name}"? This will make it available again in your workspace.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmRestore}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Restore
                </button>
                <button
                  onClick={() => setShowConfirmRestore(false)}
                  className="flex-1 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 py-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 sm:p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                Permanently Delete?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                Are you sure you want to permanently delete "{itemToDelete?.title || itemToDelete?.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmPermanentDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 py-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 