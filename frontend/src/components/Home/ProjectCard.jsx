import { Link } from "react-router-dom";
import useProgress from "../../hooks/useProgress";
import useStatusClasses from "../../hooks/useStatusClasses";

export default function ProjectCard({ project }) {
  const { _id, title, description, startDate, endDate, team } = project;

  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);

  // Calculate days remaining
  const end = new Date(project.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

  // Format date range
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  let bottomPartClasses;
  if (progress === 100) {
    bottomPartClasses = "bg-green-500/10 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  } else if (daysRemaining < 7) {
    bottomPartClasses = "bg-red-500/10 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  } else if (daysRemaining < 14) {
    bottomPartClasses =
      "bg-yellow-500/10 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  } else {
    bottomPartClasses = "bg-blue-500/10 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
  }

  return (
    <Link
      to={`/project/view/${_id}`}
      className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            {title?.length > 30 ? title.slice(0, 20) + "..." : title}
          </h3>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${statusClasses}`}
          >
            {status}
          </span>
        </div>

        <p className="text-stone-600 dark:text-stone-300 mb-6 min-h-[60px]">
          {description?.length > 60 ? description.slice(0, 60) + "..." : description}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 mb-1">
            <span>Progress: {progress || 0}%</span>
            <span>{daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}</span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex -space-x-2">
            {team.length > 0 &&
              team.map((member, index) => (
                <div
                  key={index}
                  className={`${member.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-stone-800`}
                >
                  {member.name.charAt(0)}
                </div>
              ))}
            {team.length === 0 && (
              <span className="text-sm text-stone-600 dark:text-stone-400 mb-1">
                No team members
              </span>
            )}
          </div>

          <div className="text-sm text-stone-600 dark:text-stone-400">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>
      </div>

      <div className={`px-4 py-2 text-center ${bottomPartClasses}`}>
        {progress !== 100 &&
          daysRemaining > 0 &&
          `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`}
        {progress !== 100 && daysRemaining === 0 && "Deadline passed!"}
        {progress === 100 && "Project completed!"}
      </div>
    </Link>
  );
}
