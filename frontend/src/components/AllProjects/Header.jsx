import { FolderOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-6 fade-in">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center hover-lift shadow-lg">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Your Projects
            </h2>
            <div className="w-16 h-1 gradient-blue rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
          Manage and track all your active projects with our modern dashboard
        </p>
      </div>

      <div className="flex flex-wrap gap-4 w-full sm:w-auto">
        <Link
          to="/project/new"
          className="group w-full sm:w-auto flex justify-center items-center py-4 px-6 rounded-xl shadow-lg text-sm font-semibold text-white gradient-blue hover:shadow-xl transition-all duration-300 hover-lift focus-ring"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          New Project
        </Link>
      </div>
    </div>
  );
}
