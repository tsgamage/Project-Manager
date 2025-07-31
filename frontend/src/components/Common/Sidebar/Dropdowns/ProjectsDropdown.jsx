import { useContext, useState } from "react";
import PageLayoutContext from "../../../../store/pageLayout.context";
import ProjectContext from "../../../../store/project.context";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, FolderOpen } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function ProjectsDropdown() {
  const location = useLocation();
  const isActive = location.pathname === "/project/all" || location.pathname.startsWith("/project/view/");
  const { projects } = useContext(ProjectContext);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const { isDesktopSideBarCollapsed, toggleSidebar, setIsProjectSidebarOpen } = useContext(PageLayoutContext);

  const ProjectsDropdownItem = ({ project }) => {
    const isActive = location.pathname === `/project/view/${project._id}`;
    return (
      <Link
        to={`/project/view/${project._id}`}
        className={`flex items-center px-6 py-2 text-sm text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-colors duration-200 ${isActive && "bg-stone-100 dark:bg-stone-800 hover:text-stone-900"}`}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
        <span className="truncate">{project.title}</span>
      </Link>
    );
  };

  let hoverTimer
  function handleHoverProjects() {
    if (isDesktopSideBarCollapsed) {
      hoverTimer = setTimeout(() => {
        setIsProjectSidebarOpen(true);
      }, 200);
    }
  }
  function handleLeaveProjects() {
    clearTimeout(hoverTimer)
    setIsProjectSidebarOpen(false);
  }

  return (
    <div className="space-y-1 projects-dev" onMouseEnter={handleHoverProjects} onMouseLeave={handleLeaveProjects}>
      {isDesktopSideBarCollapsed && (
        <Tooltip anchorSelect=".projects-dev" place="right" delayShow={70}>
          All Projects
        </Tooltip>
      )}
      {/* Main Projects Button */}
      <div className="relative">
        <Link
          to="/project/all"
          className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200"
            } ${isDesktopSideBarCollapsed ? "justify-center" : "justify-start"}`}
        >
          <FolderOpen
            onDoubleClick={toggleSidebar}
            className={`h-5 w-5 min-w-[20px] min-h-[20px] ${isDesktopSideBarCollapsed ? "" : "mr-3"}`}
          />
          {!isDesktopSideBarCollapsed && (
            <>
              <span className="font-medium text-sm flex-1">Projects</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-2 py-1 rounded-full">
                  {projects.length}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
                  }}
                  className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isProjectsDropdownOpen ? "rotate-180" : ""
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
        <div className="ml-3 mt-1 border-l border-stone-200 dark:border-stone-700">
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
