import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import ProjectContext from "../store/project.context.jsx";
import ProjectTasks from "../components/ViewProject/Task/ProjectTasks.jsx";
import TeamMembers from "../components/ViewProject/Member/TeamMembers.jsx";
import EditProjectModal from "../components/UI/Modals/EditProjectModal.jsx";
import LoadingSpinner from "../components/UI/Elements/LoadingSpinner.jsx";
import ProjectHeader from "../components/ViewProject/ProjectHeader.jsx";
import NavigationTabs from "../components/ViewProject/NavigationTabs.jsx";
import ProjectInfo from "../components/ViewProject/ProjectInfo.jsx";

export default function ViewProjectPage() {
  const [activeTab, setActiveTab] = useState("tasks");
  const { setSelectedProjectID, selectedProject, updateProject } = useContext(ProjectContext);

  const params = useParams();
  const editModalRef = useRef();

  useEffect(() => {
    setSelectedProjectID(params.projectID);
  }, [params.projectID, setSelectedProjectID]);

  // Calculate statistics

  const handleEditProject = async (updatedData) => {
    try {
      await updateProject({
        ...selectedProject,
        ...updatedData,
      });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!selectedProject || selectedProject._id !== params.projectID) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <EditProjectModal
        ref={editModalRef}
        project={selectedProject}
        onClose={() => editModalRef.current?.close()}
        onSave={handleEditProject}
      />

      <div className="max-w-7xl mx-auto">
        <ProjectHeader />
        <NavigationTabs onNavigationClick={setActiveTab} activeTab={activeTab} />

        <div className="px-1 sm:px-6 lg:px-8 mb-8">
          {activeTab === "tasks" && <ProjectTasks tasks={selectedProject.tasks} />}
          {activeTab === "team" && <TeamMembers team={selectedProject.team} />}
          {activeTab === "info" && <ProjectInfo />}
        </div>
      </div>
    </div>
  );
}
