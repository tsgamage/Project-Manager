import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context.jsx";
import Project from "../components/ViewProject/Project.jsx";
import Sidebar from "../components/ViewProject/SideBar.jsx";
import FloatingSidebarToggle from "../components/ViewProject/FloatingSidebarToggle.jsx";

export default function ViewProjectPage() {
  const params = useParams();
  const { setSelectedProjectID, selectedProject } = useContext(ProjectContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedProjectID(params.projectID);
  }, [params.projectID, setSelectedProjectID]);

  function handleSideBarToggle() {
    setIsSidebarOpen((preValue) => !preValue);
  }

  return (
    <div className="flex min-h-screen bg-theme-light dark:bg-theme-dark relative">
      {/* Sidebar - now with higher z-index for mobile */}
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSideBarToggle} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Floating toggle button for mobile */}
        <FloatingSidebarToggle 
          sideBarState={isSidebarOpen} 
          onToggle={handleSideBarToggle} 
        />
        
        {/* Project content */}
        {selectedProject._id === params.projectID && (
          <div className={`${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'} transition-all duration-300`}>
            <Project project={selectedProject} />
          </div>
        )}
      </div>
    </div>
  );
}