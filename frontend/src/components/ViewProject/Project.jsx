import TeamMembers from "./Member/TeamMembers";
import ProjectTasks from "./Task/ProjectTasks";
import ProjectActions from "./ProjectActions";
import ProjectHeader from "./ProjectHeader";
import EditProjectModal from "../UI/Modals/EditProjectModal";
import { useContext, useRef } from "react";
import ProjectContext from "../../store/project.context";

export default function Project({ project }) {
  const { updateProject } = useContext(ProjectContext);
  const editModal = useRef();
  return (
    <>
      <EditProjectModal
        ref={editModal}
        project={project}
        onClose={() => editModal.current.close()}
        onSave={(ProjectData) => updateProject(ProjectData)}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <ProjectHeader project={project} />
          <TeamMembers team={project.team} />
          <ProjectTasks tasks={project.tasks} />
          <ProjectActions onEdit={() => editModal.current.open()} />
        </div>
      </main>
    </>
  );
}
