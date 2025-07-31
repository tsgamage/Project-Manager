import { createContext, useEffect, useState } from "react";

const PageLayoutContext = createContext({
  isMobileSidebarOpen: false,
  setIsMobileSidebarOpen: () => { },
  toggleMobileSidebar: () => { },

  isDesktopSideBarCollapsed: false,
  setIsCollapsed: () => { },
  toggleSidebar: () => { },

  isProjectSidebarOpen: false,
  setIsProjectSidebarOpen: () => { },
  toggleProjectSidebar: () => { },
});

export function PageLayoutContextProvider({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((preValue) => !preValue);
  };

  const toggleMobileSidebar = () => {
    setIsCollapsed(false)
    setIsMobileSidebarOpen((prev) => !prev);
  };

  function toggleProjectSidebar() {
    setIsMobileSidebarOpen(false)
    setIsProjectSidebarOpen((prev) => !prev);
  }

  const pageLayoutContextValue = {
    toggleSidebar,
    isDesktopSideBarCollapsed: isCollapsed,
    toggleMobileSidebar,
    isMobileSidebarOpen: isMobileSidebarOpen,
    isProjectSidebarOpen,
    toggleProjectSidebar,
    setIsProjectSidebarOpen,
    setIsMobileSidebarOpen,
    setIsCollapsed,
  };

  return (
    <PageLayoutContext.Provider value={pageLayoutContextValue}>
      {children}
    </PageLayoutContext.Provider>
  );
}

export default PageLayoutContext;
