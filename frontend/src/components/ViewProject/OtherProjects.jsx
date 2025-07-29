import { NavLink } from "react-router-dom";
import useStatusClasses from "../../hooks/useStatusClasses.jsx";
import useProgress from "../../hooks/useProgress.jsx";

export default function OtherProjects({ project }) {
  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);

  return (
    <NavLink
      to={`/project/view/${project._id}`}
      className={({ isActive }) =>
        `block w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
          isActive ? "ring-2 ring-blue-500 border-transparent" : ""
        }`
      }
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <h4
          className="font-semibold text-stone-800 dark:text-stone-100 line-clamp-2 "
          title={project.title}
        >
          {project.title.length > 15 ? `${project.title.slice(0, 15)}...` : project.title}
        </h4>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses} flex-shrink-0`}
        >
          {status}
        </span>
      </div>

      <p
        className="text-sm text-stone-600 dark:text-stone-300 mb-3 line-clamp-3"
        title={project.description}
      >
        {project.description.length > 50
          ? `${project.description.slice(0, 50)} ...`
          : project.description}
      </p>

      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2 flex-wrap gap-y-1">
        <span className="whitespace-nowrap">{project.team?.length || 0} members</span>
        <span className="whitespace-nowrap">
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

      <div className="w-full bg-stone-100 dark:bg-stone-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </NavLink>
  );
}
