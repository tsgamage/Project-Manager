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
    <div className="flex flex-col md:flex-row min-h-screen bg-theme-light dark:bg-theme-dark">
      <FloatingSidebarToggle sideBarState={isSidebarOpen} onToggle={handleSideBarToggle} />
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSideBarToggle} />
      {/* checking this because if not the component renders 4 times and first 2 time it gets the old
      projects data */}
      {selectedProject._id === params.projectID && <Project project={selectedProject} />}
    </div>
  );
}
