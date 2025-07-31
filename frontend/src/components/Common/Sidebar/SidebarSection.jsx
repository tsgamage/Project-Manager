import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function SidebarSection({ items, className = "" }) {
  const { isDesktopSideBarCollapsed, toggleSidebar } = useContext(PageLayoutContext);
  const location = useLocation();

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        const uniqueClass = item.name.replace(/\s/g, "");

        return (
          <>
            <Link
              to={item.path}
              className={`_${uniqueClass} group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200"
              } ${isDesktopSideBarCollapsed ? "justify-center" : "justify-start"}`}
              key={item.path}
            >
              <item.icon
                onDoubleClick={toggleSidebar}
                className={`h-5 w-5 min-w-[20px] min-h-[20px] ${isDesktopSideBarCollapsed ? "" : "mr-3"}`}
              />
              {!isDesktopSideBarCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </Link>
            {isDesktopSideBarCollapsed && (
              <Tooltip anchorSelect={`._${uniqueClass}`} place="right" delayShow={70}>
                {item.name}
              </Tooltip>
            )}
          </>
        );
      })}
    </div>
  );
}
