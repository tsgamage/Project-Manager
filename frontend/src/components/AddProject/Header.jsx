import { Link } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center sm:gap-6 fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
          <Plus className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Add New Project
          </h2>
          <div className="w-12 h-1 gradient-blue rounded-full"></div>
        </div>
      </div>

      <Link
        to="/project/all"
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-xl font-medium transition-all duration-300 text-sm text-gray-300 hover:bg-gray-700 hover:text-white hover-lift"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>
    </div>
  );
}
