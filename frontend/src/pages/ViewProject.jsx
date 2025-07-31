import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context.jsx";
import Project from "../components/ViewProject/Project.jsx";
import Sidebar from "../components/ViewProject/SideBar.jsx";
import FloatingSidebarToggle from "../components/ViewProject/FloatingSidebarToggle.jsx";

export default function ViewProjectPage() {
  const params = useParams();
  const { setSelectedProjectID, selectedProject } = useContext(ProjectContext);

  useEffect(() => {
    setSelectedProjectID(params.projectID);
  }, [params.projectID, setSelectedProjectID]);

  return (
    <div className="flex min-h-screen bg-theme-light dark:bg-theme-dark relative">
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <FloatingSidebarToggle />
        {/* Project content */}
        {selectedProject._id === params.projectID && (
          <div className={`md:ml-0 transition-all duration-300`}>
            <Project project={selectedProject} />
          </div>
        )}
      </div>
    </div>
  );
}
