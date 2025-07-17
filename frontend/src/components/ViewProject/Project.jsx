import TeamMembers from "./Member/TeamMembers";
import ProjectTasks from "./Task/ProjectTasks";
import ProjectActions from "./ProjectActions";
import ProjectHeader from "./ProjectHeader";

export default function Project({ project }) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8">
        <ProjectHeader project={project} />
        <TeamMembers team={project.team} />
        <ProjectTasks tasks={project.tasks} />
        <ProjectActions onDelete={() => {}} />
      </div>
    </main>
  );
}
