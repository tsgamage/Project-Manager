import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  FolderOpen, 
  Settings, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from "lucide-react";

export default function Sidebar({ isMobileOpen, onMobileClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Prevent scroll events from bubbling up
  const handleSidebarScroll = (e) => {
    e.stopPropagation();
  };

  const sidebarItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
      top: true
    },
    {
      name: "Team",
      icon: Users,
      path: "/team",
      top: true
    },
    {
      name: "Projects",
      icon: FolderOpen,
      path: "/projects",
      top: true
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      top: false
    },
    {
      name: "Trash",
      icon: Trash2,
      path: "/trash",
      top: false
    }
  ];

  const topItems = sidebarItems.filter(item => item.top);
  const bottomItems = sidebarItems.filter(item => !item.top);

  const SidebarItem = ({ item, isActive }) => (
    <Link
      to={item.path}
      className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200"
      } ${isCollapsed ? "justify-center" : "justify-start"}`}
      onClick={onMobileClose}
    >
      <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
      {!isCollapsed && (
        <span className="font-medium text-sm">{item.name}</span>
      )}
    </Link>
  );

  const SidebarSection = ({ items, className = "" }) => (
    <div className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <SidebarItem
            key={item.name}
            item={item}
            isActive={isActive}
          />
        );
      })}
    </div>
  );

  // Mobile Sidebar
  if (isMobileOpen) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={onMobileClose}
        />
        
        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 z-50 md:hidden transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Menu
              </h2>
              <button
                onClick={onMobileClose}
                className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-stone-600 dark:text-stone-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-6">
              <SidebarSection items={topItems} />
              
              {/* Add New Button */}
              <div className="pt-4">
                <button className="w-full flex items-center justify-center px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </button>
              </div>

              <div className="border-t border-stone-200 dark:border-stone-700 pt-6">
                <SidebarSection items={bottomItems} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div 
      className={`hidden md:flex flex-col h-full bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onWheel={handleSidebarScroll}
      onTouchMove={handleSidebarScroll}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700 flex-shrink-0">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Menu
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-stone-600 dark:text-stone-400" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-stone-600 dark:text-stone-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        <SidebarSection items={topItems} />
        
        {/* Add New Button */}
        {!isCollapsed && (
          <div className="pt-4">
            <button className="w-full flex items-center justify-center px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </button>
          </div>
        )}
        {isCollapsed && (
          <div className="pt-4">
            <button className="w-full flex items-center justify-center p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="border-t border-stone-200 dark:border-stone-700 pt-6">
          <SidebarSection items={bottomItems} />
        </div>
      </div>
    </div>
  );
}
