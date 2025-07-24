import { NavLink } from "react-router-dom";
import useStatusClasses from "../../hooks/useStatusClasses.jsx";
import useProgress from "../../hooks/useProgress.jsx";

export default function OtherProjects({ project }) {
  // Dummy status for now; ideally, status should come from each project
  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);

  const navLinkClasses =
    "w-full max-w-xs bg-stone-800 border border-stone-700 hover:bg-stone-500/20 rounded-xl p-4 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none flex flex-col gap-2";

  return (
    <NavLink
      to={`/project/view/${project._id}`}
      key={project.id}
      className={({ isActive }) => {
        return isActive ? navLinkClasses + " ring-2 ring-blue-500" : navLinkClasses;
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-base text-stone-100 truncate">{project.title}</h4>
        {/* Compact status pill */}
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClasses} bg-blue-600/20 text-blue-400 ml-2 whitespace-nowrap`}
        >
          {status}
        </span>
      </div>

      {/* Project description */}
      <p className="text-xs text-stone-300 mb-1 line-clamp-2">
        {project.description.length > 50
          ? project.description.slice(0, 50) + "..."
          : project.description}
      </p>
      <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
        {/* Team members count*/}
        <span>{project.team ? `${project.team.length} members` : "0 members"}</span>

        {/* Dates */}
        <span className="ml-2">
          {new Date(project.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          {" - "}
          {new Date(project.endDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Progress bar (placeholder if no real data) */}
      <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-stone-300 transition-all duration-300"
          style={{ width: progress ? `${progress}%` : "0%" }}
        ></div>
      </div>
    </NavLink>
  );
}
