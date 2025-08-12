import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function SidebarHeader() {
  const { isMobileSidebarOpen, toggleMobileSidebar, toggleSidebar, isDesktopSideBarCollapsed } =
    useContext(PageLayoutContext);
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
      {isMobileSidebarOpen ? (
        <>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <h2 className="text-lg font-semibold text-white">Project Manager</h2>
          </div>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors focus-ring"
          >
            <PanelRightOpen className="h-5 w-5 text-gray-300" />
          </button>
        </>
      ) : (
        <button
          onClick={toggleSidebar}
          className={`mx-auto hover:bg-gray-700 transition-colors flex items-center justify-center focus-ring ${
            isDesktopSideBarCollapsed ? "w-10 h-10 rounded-xl" : "p-2 rounded-lg w-full"
          }`}
        >
          {isDesktopSideBarCollapsed ? (
            <PanelRightClose className="h-4 w-4 text-gray-300" />
          ) : (
            <PanelRightOpen className="h-4 w-4 text-gray-300" />
          )}
        </button>
      )}
    </div>
  );
}
