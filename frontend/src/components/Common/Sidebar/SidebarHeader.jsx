import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarHeader() {
  const { isMobileSidebarOpen, toggleMobileSidebar, toggleSidebar, isDesktopSideBarCollapsed } =
    useContext(PageLayoutContext);
  return (
    <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700 flex-shrink-0">
      {isMobileSidebarOpen ? (
        <>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Project Manager
          </h2>
          <button
            onClick={toggleMobileSidebar}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-stone-600 dark:text-stone-400" />
          </button>
        </>
      ) : (
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg mx-auto hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors w-full flex items-center justify-center`}
        >
          {isDesktopSideBarCollapsed ? (
            <ChevronRight className="h-4 w-4 text-stone-600 dark:text-stone-400" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-stone-600 dark:text-stone-400" />
          )}
        </button>
      )}
    </div>
  );
}
