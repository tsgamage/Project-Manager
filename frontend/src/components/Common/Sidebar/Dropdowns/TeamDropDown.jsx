import { useContext, useState } from "react";
import PageLayoutContext from "../../../../store/pageLayout.context";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Users } from "lucide-react";

export default function TeamDropdown() {
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false);
  const location = useLocation();

  const { isDesktopSideBarCollapsed } = useContext(PageLayoutContext);
  const isActive = location.pathname === "/team" || location.pathname.startsWith("/team/");

  const dummyPeople = [
    { id: 1, name: "John Doe", role: "Frontend Developer" },
    { id: 2, name: "Jane Smith", role: "Backend Developer" },
    { id: 3, name: "Mike Johnson", role: "UI/UX Designer" },
    { id: 4, name: "Sarah Wilson", role: "Project Manager" },
    { id: 5, name: "Alex Brown", role: "QA Engineer" },
  ];

  const TeamsDropdownItem = ({ person }) => (
    <Link
      to={`/team/${person.id}`}
      className="flex items-center px-6 py-2 text-sm text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-colors duration-200"
    >
      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
      <div className="flex flex-col">
        <span className="truncate font-medium">{person.name}</span>
        <span className="truncate text-xs text-stone-500 dark:text-stone-500">{person.role}</span>
      </div>
    </Link>
  );

  return (
    <div className="space-y-1">
      {/* Main Teams Button */}
      <div className="relative">
        <Link
          to="/team"
          className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200"
            } ${isDesktopSideBarCollapsed ? "justify-center" : "justify-start"}`}
        >
          <Users className={`h-5 w-5 ${isDesktopSideBarCollapsed ? "" : "mr-3"}`} />
          {!isDesktopSideBarCollapsed && (
            <>
              <span className="font-medium text-sm flex-1">Teams</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-2 py-1 rounded-full">
                  {dummyPeople.length}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsTeamsDropdownOpen(!isTeamsDropdownOpen);
                  }}
                  className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isTeamsDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </div>
            </>
          )}
        </Link>
      </div>

      {/* Teams Dropdown */}
      {!isDesktopSideBarCollapsed && isTeamsDropdownOpen && dummyPeople.length > 0 && (
        <div className="ml-3 mt-1 border-l border-stone-200 dark:border-stone-700">
          <div className="space-y-1">
            {dummyPeople.map((person) => (
              <TeamsDropdownItem key={person.id} person={person} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
