import PageLayoutContext from "../../store/pageLayout.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Home, Settings, Trash2 } from "lucide-react";
import SidebarHeader from "./Sidebar/SidebarHeader.jsx";
import ScrollableSection from "./Sidebar/ScrollableSection.jsx";
import BottomSection from "./Sidebar/BottomSection.jsx";

export default function Sidebar() {
  const { isDesktopSideBarCollapsed, isMobileSidebarOpen, toggleMobileSidebar } =
    useContext(PageLayoutContext);

  const topItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
      top: true,
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      name: "Trash",
      icon: Trash2,
      path: "/trash",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <SidebarHeader />
      <ScrollableSection items={topItems} />
      <BottomSection items={bottomItems} />
    </div>
  );

  // Mobile Sidebar with Backdrop
  if (isMobileSidebarOpen) {
    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={toggleMobileSidebar} />

        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 z-50 md:hidden transform transition-transform duration-300 ease-in-out">
          <SidebarContent />
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`hidden md:flex flex-col h-full bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 transition-all duration-300 ease-in-out ${
        isDesktopSideBarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <SidebarContent />
    </div>
  );
}
