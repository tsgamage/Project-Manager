import { useContext, useState } from "react";
import PageLayoutContext from "../../../../store/pageLayout.context";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Users } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function TeamDropdown() {
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false);
  const location = useLocation();

  const { isDesktopSideBarCollapsed, toggleSidebar } = useContext(PageLayoutContext);
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
      className="flex items-center px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
    >
      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
      <div className="flex flex-col">
        <span className="truncate font-medium">{person.name}</span>
        <span className="truncate text-xs text-gray-400">{person.role}</span>
      </div>
    </Link>
  );

  return (
    <div className="space-y-1 team-dev">
      {isDesktopSideBarCollapsed && (
        <Tooltip anchorSelect=".team-dev" place="right" delayShow={70}>
          Your Team
        </Tooltip>
      )}
      {/* Main Teams Button */}
      <div className="relative">
        <Link
          to="/team/members"
          className={`group flex items-center transition-all duration-300 hover-lift ${
            isActive
              ? "gradient-blue text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } ${isDesktopSideBarCollapsed ? "justify-center w-10 h-10 rounded-xl mx-auto" : "px-3 py-3 rounded-xl justify-start"}`}
        >
          <Users
            onDoubleClick={toggleSidebar}
            className={`transition-transform duration-200 group-hover:scale-110 ${isDesktopSideBarCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3"}`}
          />
          {!isDesktopSideBarCollapsed && (
            <>
              <span className="font-medium text-sm flex-1">Teams</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {dummyPeople.length}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsTeamsDropdownOpen(!isTeamsDropdownOpen);
                  }}
                  className="p-1 hover:bg-gray-600 rounded transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isTeamsDropdownOpen ? "rotate-180" : ""
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
        <div className="ml-3 mt-1 border-l border-gray-700">
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
