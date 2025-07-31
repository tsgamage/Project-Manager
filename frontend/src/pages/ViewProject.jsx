import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProjectContext from "../store/project.context.jsx";
import Project from "../components/ViewProject/Project.jsx";
import ProjectSideBar from "../components/ViewProject/ProjectSideBar.jsx";
import FloatingSidebarToggle from "../components/ViewProject/FloatingSidebarToggle.jsx";

export default function ViewProjectPage() {
  const params = useParams();
  const { setSelectedProjectID, selectedProject } = useContext(ProjectContext);

  useEffect(() => {
    setSelectedProjectID(params.projectID);
  }, [params.projectID, setSelectedProjectID]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-theme-light dark:bg-theme-dark relative">
      <ProjectSideBar />
      <FloatingSidebarToggle />

      {selectedProject._id === params.projectID && (
        <div className={`md:ml-0 transition-all duration-300`}>
          <Project project={selectedProject} />
        </div>
      )}
    </div>
  );
}
