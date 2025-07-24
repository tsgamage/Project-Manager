import Project from "../components/ViewProject/Project";
import Sidebar from "../components/ViewProject/SideBar";
import FloatingSidebarToggle from "../components/ViewProject/FloatingSidebarToggle";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context";

export default function ViewProjectPage() {
  const params = useParams();
  const loaderData = useRouteLoaderData("project");

  const { setSelectedProjectID, setSelectedProject, selectedProject } = useContext(ProjectContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedProjectID(params.projectID);
    setSelectedProject(loaderData.data.projects);
  }, []);

  function handleSideBarToggle() {
    setIsSidebarOpen((preValue) => !preValue);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-theme-light dark:bg-theme-dark">
      <FloatingSidebarToggle onToggle={handleSideBarToggle} />
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSideBarToggle} />
      <Project project={selectedProject} />
    </div>
  );
}

export async function viewProjectLoader({ params }) {
  try {
    const response = await fetch(`http://localhost:3000/api/project/${params.projectID}`);

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
        {
          status: 500,
        }
      );
    }
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}
