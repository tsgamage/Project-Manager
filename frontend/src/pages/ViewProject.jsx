import Project from "../components/ViewProject/Project";
import Sidebar from "../components/ViewProject/SideBar";
import FloatingSidebarToggle from "../components/ViewProject/FloatingSidebarToggle";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context";

export default function ViewProjectPage() {
  const loaderData = useRouteLoaderData("project");
  const params = useParams();

  const { project, setProject, setSelectedProject } =
    useContext(ProjectContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const projectData = loaderData.data.projects;

  useEffect(() => {
    setProject(projectData);
    setSelectedProject(params.projectID);
  }, []);

  function handleSideBarToggle() {
    setIsSidebarOpen((preValue) => !preValue);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-theme-light dark:bg-theme-dark">
      <AddMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        onAddMember={(member) => console.log(member)}
      />
      <FloatingSidebarToggle onToggle={handleSideBarToggle} />
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSideBarToggle} />
      <Project project={project} />
    </div>
  );
}

export async function viewProjectLoader({ params }) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/project/${params.projectID}`
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 500,
      });
    }
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}
