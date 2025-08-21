import { useContext, useState } from "react";
import PageLayoutContext from "../../../../store/pageLayout.context";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, FolderOpen } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";

export default function ProjectsDropdown() {
  const location = useLocation();

  // States
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const { isDesktopSideBarCollapsed, toggleSidebar } = useContext(PageLayoutContext);

  // Store
  const projects = useSelector((state) => state.project.projects);

  const isActive =
    location.pathname === "/project/all" || location.pathname.startsWith("/project/view/");

  const ProjectsDropdownItem = ({ project }) => {
    const isActive = location.pathname === `/project/view/${project._id}`;
    return (
      <Link
        to={`/project/view/${project._id}`}
        className={`flex items-center px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${isActive && "bg-gray-700 text-white"}`}
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
        <span className="truncate">{project.title}</span>
      </Link>
    );
  };

  return (
    <div className="space-y-1 projects-dev">
      {isDesktopSideBarCollapsed && (
        <Tooltip anchorSelect=".projects-dev" place="right" delayShow={70}>
          All Projects
        </Tooltip>
      )}
      {/* Main Projects Button */}
      <div className="relative">
        <Link
          to="/project/all"
          className={`group flex items-center transition-all duration-300 hover-lift ${
            isActive
              ? "gradient-blue text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } ${isDesktopSideBarCollapsed ? "justify-center w-10 h-10 rounded-xl mx-auto" : "px-3 py-3 rounded-xl justify-start"}`}
        >
          <FolderOpen
            onDoubleClick={toggleSidebar}
            className={`transition-transform duration-200 group-hover:scale-110 ${isDesktopSideBarCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3"}`}
          />
          {!isDesktopSideBarCollapsed && (
            <>
              <span className="font-medium text-sm flex-1">Projects</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {projects.length}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
                  }}
                  className="p-1 hover:bg-gray-600 rounded transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProjectsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </>
          )}
        </Link>
      </div>

      {/* Projects Dropdown */}
      {!isDesktopSideBarCollapsed && isProjectsDropdownOpen && projects.length > 0 && (
        <div className="ml-3 mt-1 border-l border-gray-700">
          <div className="space-y-1">
            {projects.map((project) => (
              <ProjectsDropdownItem key={project._id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
