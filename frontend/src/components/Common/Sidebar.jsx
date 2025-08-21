import SidebarHeader from "./Sidebar/SidebarHeader.jsx";
import ScrollableSection from "./Sidebar/ScrollableSection.jsx";
import BottomSection from "./Sidebar/BottomSection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui.slice.js";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isDesktopSideBarCollapsed = useSelector((state) => state.ui.desktopDideBarCollapsed);
  const isMobileSidebarOpen = useSelector((state) => state.ui.mobileSideBarOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <SidebarHeader />
      <ScrollableSection />
      <BottomSection />
    </div>
  );

  // Mobile Sidebar with Backdrop
  if (isMobileSidebarOpen) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 z-50 md:hidden"
          onClick={() => dispatch(uiActions.toggleMobileSideBar())}
        />
        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-stone-800 border-r border-stone-600 z-50 md:hidden transform transition-transform duration-300 ease-in-out">
          <SidebarContent />
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`z-50 hidden md:flex flex-col h-full glass border-r border-gray-700 transition-all duration-300 ease-in-out ${
        isDesktopSideBarCollapsed ? "w-16" : "w-56"
      }`}
    >
      <SidebarContent />
    </div>
  );
}
