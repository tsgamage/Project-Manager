import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input").focus();
      } else if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="w-full bg-stone-900 border-b border-stone-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PM</span>
            </div>
            <span className="hidden md:block text-xl font-bold text-stone-200">
              Project Manager
            </span>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-6">
            <div
              className={`flex items-center border-2 rounded-full overflow-hidden transition-all duration-300 ${
                isSearchFocused
                  ? "border-blue-500 bg-stone-800"
                  : "border-stone-700 bg-stone-800"
              }`}
            >
              <svg
                className="h-5 w-5 text-stone-400 ml-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-12 px-4 py-2 text-stone-200 bg-transparent border-0 focus:ring-0 focus:outline-none"
                placeholder="Search projects..."
              />
              <div className="hidden sm:flex items-center mr-4 px-2 py-1 text-xs rounded bg-stone-700 text-stone-300 border border-stone-600">
                Ctrl+K
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="p-2 rounded-full hover:bg-stone-800 relative">
              <svg
                className="h-6 w-6 text-stone-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold">U</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-stone-900"></div>
                </div>
                <span className="hidden lg:block text-stone-300 group-hover:text-white">
                  User Name
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-stone-800 rounded-lg shadow-lg border border-stone-700 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-stone-700">
                    <p className="text-sm font-medium text-stone-200">
                      User Name
                    </p>
                    <p className="text-sm text-stone-400 truncate">
                      user@example.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-white"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-white"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/projects"
                      className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-white"
                    >
                      Your Projects
                    </Link>
                  </div>

                  <div className="py-1 border-t border-stone-700">
                    <button className="w-full text-left px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-red-500">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
