import { Link } from "react-router-dom";
import otherProjectsData from "../../util/OtherProjectsData";
import useStatusClasses from "../../hooks/useStatusClasses.jsx";

export default function OtherProjects() {
  const { status, statusClasses } = useStatusClasses(43);

  return (
    <div className="space-y-3">
      {otherProjectsData.map((project) => (
        <Link
          to={`/project/view/${project.id}`}
          key={project.id}
          className="block bg-stone-700 hover:bg-stone-600 rounded-lg p-4 transition-colors"
        >
          <h4 className="font-medium text-stone-200">{project.title}</h4>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${statusClasses}`}>
              {status}
            </span>
            <span className="text-xs text-stone-400">
              {new Date(project.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(project.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
