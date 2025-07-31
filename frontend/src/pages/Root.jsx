import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";
import { Menu } from "lucide-react";

export default function RootLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-theme-light dark:bg-theme-dark overflow-hidden flex flex-col">
      {/* Navbar */}
      <div className="flex-shrink-0">
        <Navbar />
        
        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-4 py-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
