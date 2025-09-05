import { CircleArrowRight, FolderOpen, Plus, Rotate3D, RotateCw, Search, X } from "lucide-react";
import PulsingLineUnderTitles from "../UI/Elements/PulsingLineUnderTitles";
import LinkButton from "../UI/Elements/LinkButton";

export default function Header({
  onSearchClick,
  showSeach,
  onFiltersResetClick,
  isFiltering,
  projectsCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-6 fade-in">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center hover-lift shadow-lg">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your Projects</h2>
            <PulsingLineUnderTitles />
          </div>
        </div>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
          Manage and track all your active projects
        </p>
      </div>

      <div className="flex flex-wrap gap-4 w-full sm:w-auto">
        <LinkButton link="/project/new" paddingClasses="py-4 px-6 ">
          <Plus className="w-5 h-5 mr-2  transition-transform duration-300" />
          New Project
        </LinkButton>
        <div className="flex w-full gap-1 sm:hidden">
          {projectsCount > 0 && (
            <button
              onClick={onSearchClick}
              className="bg-gray-700/50 py-4 px-6 group w-full sm:w-auto flex justify-center items-center rounded-xl shadow-lg text-sm font-semibold text-white hover:shadow-xl transition-all duration-300 hover-lift"
            >
              {showSeach ? <X className="w-5 h-5 mr-2" /> : <Search className="w-5 h-5 mr-2 " />}
              {showSeach ? "Close Search" : "Search Projects"}
            </button>
          )}
          {isFiltering && (
            <button
              onClick={onFiltersResetClick}
              className="w-fit bg-red-500/50 py-4 px-4 group flex justify-center items-center rounded-full"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
