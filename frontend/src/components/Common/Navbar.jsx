import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth.context";
import { ChevronUp, LogOut, Menu, Settings, SquareArrowOutUpRight, User, Bell } from "lucide-react";
import { toast } from "react-hot-toast";
import ProjectContext from "../../store/project.context";
import PageLayoutContext from "../../store/pageLayout.context";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Contexts
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { projects, setProjects } = useContext(ProjectContext);
  const { toggleMobileSidebar } = useContext(PageLayoutContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  function handleLogout() {
    logout();
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    setProjects([]);
  }

  return (
    <header className="w-full backdrop-blur-xl bg-black/40 border-b border-gray-800/50 sticky top-0 z-50 transition-all duration-300 py-2 shadow-2xl">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-300 mr-2 focus-ring"
            onClick={toggleMobileSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>

          {/* Logo */}
          <Link to="/" className="hidden md:flex items-center space-x-2 group">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-xs">PM</span>
            </div>
            <span className="font-bold text-white transition-all duration-300 text-base group-hover:text-blue-300 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Project Manager
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Notification Icon */}
            <button className="p-1.5 rounded-lg hover:bg-gray-800/50 relative transition-all duration-300 focus-ring">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Auth Button - Show when not authenticated */}
            {!isAuthenticated && !user && (
              <Link
                to="/auth/login"
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:bg-gray-800/50 px-3 py-1.5 rounded-lg text-sm"
              >
                Sign in
              </Link>
            )}

            {/* Profile Dropdown - Show when authenticated */}
            {isAuthenticated && user && user.isVerified && (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 w-7 h-7 hover-lift">
                      <span className="text-white font-semibold text-xs">
                        {user ? user.name[0] : "P"}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm"></div>
                  </div>
                  <div className="hidden lg:flex lg:flex-col lg:items-start">
                    <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors truncate">
                      {user ? user.name : "User Name"}
                    </span>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                  <ChevronUp
                    className={`hidden lg:block w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop for mobile - positioned behind dropdown */}
                    <div
                      className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>

                    {/* Dropdown content */}
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 backdrop-blur-xl bg-black/40 rounded-xl shadow-2xl border border-gray-800/50 overflow-hidden z-50 transform transition-all duration-200 ease-out slide-in">
                      {/* Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-b border-gray-800/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <span className="text-white font-semibold text-sm">U</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {user ? user.name : "User Name"}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                              {user ? user.email : "user@example.com"}
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span className="text-xs text-green-400 font-medium">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/user/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-all duration-300 group"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-300" />
                          Your Profile
                        </Link>

                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-all duration-300 group"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-300" />
                          Settings
                        </Link>

                        <Link
                          to="/projects"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 transition-all duration-300 group"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <SquareArrowOutUpRight className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-300" />
                          Your Projects ({projects && projects?.length})
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-800/50"></div>

                      {/* Sign Out */}
                      <div className="py-1">
                        <button
                          className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition-all duration-300 group"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-300" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
