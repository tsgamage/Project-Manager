import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`w-full bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div
              className={`bg-blue-600 flex items-center justify-center rounded-lg transition-all duration-300 ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <span className="text-white font-bold text-xl">PM</span>
            </div>
            <span
              className={`hidden md:block font-bold text-stone-800 dark:text-stone-200 transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              Project Manager
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-stone-700 dark:text-stone-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Notification Icon */}
            <button className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 relative transition-colors">
              <svg
                className="h-5 w-5 text-stone-600 dark:text-stone-400"
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

            {/* Auth Button - Show when not authenticated */}
            <Link
              to="/auth/login"
              className="text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors font-medium"
            >
              Sign in
            </Link>

            {/* Profile Dropdown - Show when authenticated */}
            {/* <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isScrolled ? "w-8 h-8" : "w-10 h-10"
                    }`}
                  >
                    <span className="text-white font-semibold">U</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-stone-900"></div>
                </div>
                <span className="hidden lg:block text-stone-700 group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white transition-colors">
                  User Name
                </span>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-800 rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-200">
                    User Name
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 truncate">
                    user@example.com
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/projects"
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
                  >
                    Your Projects
                  </Link>
                </div>

                <div className="py-1 border-t border-stone-200 dark:border-stone-700">
                  <button className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-red-50 hover:text-red-600 dark:text-stone-300 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors">
                    Sign out
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </nav>
      </div>
    </header>
  );
}
