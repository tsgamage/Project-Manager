import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-header-light dark:text-header-dark">
          Your Projects
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mt-2 text-sm sm:text-base">
          Manage and track all your active projects
        </p>
      </div>

      <div className="flex flex-wrap gap-4 w-full sm:w-auto">
        <Link
          to="/project/new"
          className="w-full sm:w-auto flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </Link>
      </div>
    </div>
  );
}
