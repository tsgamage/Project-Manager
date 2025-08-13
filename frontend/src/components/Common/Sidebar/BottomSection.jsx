import { useContext } from "react";
import PageLayoutContext from "../../../store/pageLayout.context";
import SidebarSection from "./SidebarSection";
import { Plus, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomSection() {
  const bottomItems = [
    {
      name: "Profile",
      icon: UserRound,
      path: "/user/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/user/settings",
    },
  ];

  const { isDesktopSideBarCollapsed } = useContext(PageLayoutContext);
  return (
    <div className="border-t border-gray-700 glass flex-shrink-0">
      <div className="p-4 space-y-4">
        {/* Add New Button */}
        {!isDesktopSideBarCollapsed ? (
          <Link
            to="/project/new"
            className="cursor-pointer w-full flex items-center justify-center px-3 py-3 gradient-blue hover:shadow-lg text-white rounded-xl transition-all duration-300 font-medium text-sm hover-lift"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Link>
        ) : (
          <Link
            to="/project/new"
            className="cursor-pointer w-10 h-10 flex items-center justify-center gradient-blue hover:shadow-lg text-white rounded-xl transition-all duration-300 hover-lift mx-auto"
          >
            <Plus className="w-4 h-4" />
          </Link>
        )}

        <SidebarSection items={bottomItems} />
      </div>
    </div>
  );
}
