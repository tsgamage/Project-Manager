import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { uiActions } from "../../../store/ui.slice";

export default function SidebarSection({ items, className = "" }) {
  const dispatch = useDispatch();
  const isDesktopSideBarCollapsed = useSelector((state) => state.ui.desktopDideBarCollapsed);
  const location = useLocation();

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        const uniqueClass = item.name.replace(/\s/g, "");

        return (
          <div key={item?.name + item?.path}>
            <Link
              to={item.path}
              className={`_${uniqueClass} group flex items-center transition-all duration-300 hover-lift ${
                isActive
                  ? "gradient-blue text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } ${isDesktopSideBarCollapsed ? "justify-center w-10 h-10 rounded-xl mx-auto" : "px-3 py-3 rounded-xl justify-start"}`}
              key={item.path}
            >
              <item.icon
                onDoubleClick={() => dispatch(uiActions.toggleDesktopSideBar())}
                className={`transition-transform duration-200 group-hover:scale-110 ${isDesktopSideBarCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3"}`}
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
          </div>
        );
      })}
    </div>
  );
}
