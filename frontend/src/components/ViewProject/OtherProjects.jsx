import { NavLink } from "react-router-dom";
import useStatusClasses from "../../hooks/useStatusClasses.jsx";
import useProgress from "../../hooks/useProgress.jsx";

export default function OtherProjects({ project }) {
  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);

  const navLinkClasses =
    "w-full max-w-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none flex flex-col gap-2";

  return (
    <NavLink
      to={`/project/view/${project._id}`}
      key={project.id}
      className={({ isActive }) => {
        return isActive 
          ? navLinkClasses + " ring-2 ring-blue-500" 
          : navLinkClasses;
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-base text-stone-800 dark:text-stone-100 truncate">
          {project.title}
        </h4>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClasses} bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ml-2 whitespace-nowrap`}
        >
          {status}
        </span>
      </div>

      <p className="text-xs text-stone-600 dark:text-stone-300 mb-1 line-clamp-2">
        {project.description.length > 50
          ? project.description.slice(0, 50) + "..."
          : project.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
        <span>{project.team ? `${project.team.length} members` : "0 members"}</span>
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

      <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-stone-600 dark:bg-stone-300 transition-all duration-300"
          style={{ width: progress ? `${progress}%` : "0%" }}
        ></div>
      </div>
    </NavLink>
  );
}