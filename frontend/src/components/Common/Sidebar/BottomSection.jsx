import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import SidebarSection from "./SidebarSection";
import { Plus } from "lucide-react";

export default function BottomSection({ items }) {
  const { isDesktopSideBarCollapsed } = useContext(PageLayoutContext);
  return (
    <div className="border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 flex-shrink-0">
      <div className="p-4 space-y-4">
        {/* Add New Button */}
        {!isDesktopSideBarCollapsed ? (
          <button className="w-full flex items-center justify-center px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </button>
        ) : (
          <button className="w-full flex items-center justify-center p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            <Plus className="h-4 w-4" />
          </button>
        )}

        <SidebarSection items={items} />
      </div>
    </div>
  );
}
