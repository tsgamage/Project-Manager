import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-header-light dark:text-header-dark">
          Your Projects
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mt-2">
          Manage and track all your active projects
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link to="/project/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Project
          </button>
        </Link>
      </div>
    </div>
  );
}
