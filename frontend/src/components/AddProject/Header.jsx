import { Link } from "react-router-dom";
import { ArrowLeft, FolderPlus } from "lucide-react";

export default function Header() {
  return (
    <div className="mb-6 sm:mb-8 fade-in">
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <Link to="/" className="p-2 rounded-xl hover:bg-gray-700 transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-400" />
        </Link>
        <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
          <FolderPlus className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">New Project</h1>
          <p className="text-sm sm:text-base text-gray-400">Create a new project </p>
        </div>
      </div>
    </div>
  );
}
