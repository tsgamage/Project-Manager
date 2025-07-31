import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import { Link } from "react-router-dom";

export default function SidebarSection({ items, className }) {
  const { isDesktopSideBarCollapsed } = useContext(PageLayoutContext);
  return (
    <div className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200"
              } ${isDesktopSideBarCollapsed ? "justify-center" : "justify-start"}`}
          >
            <item.icon className={`h-5 w-5 ${isDesktopSideBarCollapsed ? "" : "mr-3"}`} />
            {!isDesktopSideBarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
          </Link>
        );
      })}
    </div>
  );
}
