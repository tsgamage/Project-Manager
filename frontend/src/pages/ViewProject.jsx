import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ProjectTasks from "../components/ViewProject/Task/ProjectTasks.jsx";
import TeamMembers from "../components/ViewProject/Member/TeamMembers.jsx";
import EditProjectModal from "../components/UI/Modals/EditProjectModal.jsx";
import LoadingSpinner from "../components/UI/Elements/LoadingSpinner.jsx";
import ProjectHeader from "../components/ViewProject/ProjectHeader.jsx";
import NavigationTabs from "../components/ViewProject/NavigationTabs.jsx";
import ProjectInfo from "../components/ViewProject/ProjectInfo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../store/project.slice.js";
import { updateProjectThunk } from "../store/project.action.js";

export default function ViewProjectPage() {
  const [activeTab, setActiveTab] = useState("tasks");
  const selectedProject = useSelector((state) => state.project.selectedProject);

  const params = useParams();
  const editModalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.setSelecteProjectID(params.projectID));
  }, [dispatch, params.projectID]);

  // Calculate statistics

  const handleEditProject = async (updatedData) => {
    try {
      await dispatch(
        updateProjectThunk({
          ...selectedProject,
          ...updatedData,
        })
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!selectedProject || selectedProject._id !== params.projectID) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <EditProjectModal ref={editModalRef} project={selectedProject} onSave={handleEditProject} />

      <div className="max-w-7xl mx-auto">
        <ProjectHeader />
        <NavigationTabs onNavigationClick={setActiveTab} activeTab={activeTab} />

        <div className="px-1 sm:px-6 lg:px-8 mb-8">
          {activeTab === "tasks" && <ProjectTasks tasks={selectedProject.tasks} />}
          {activeTab === "team" && <TeamMembers team={selectedProject.team} />}
          {activeTab === "info" && <ProjectInfo onEdit={() => editModalRef.current?.open()} />}
        </div>
      </div>
    </div>
  );
}
