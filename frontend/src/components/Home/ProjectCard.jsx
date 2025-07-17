import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const {
    _id,
    title,
    description,
    startDate,
    endDate,
    status,
    progress,
    team,
  } = project;

  // Helper to get status-specific colors
  const getStatusClasses = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "";
    }
  };

  // Calculate days remaining
  const end = new Date(endDate);
  const today = new Date();
  const timeDiff = Math.abs(end - today);
  const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Format date range
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link
      to={`/project/view/${_id}`}
      className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out h-full flex flex-col"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            {title}
          </h3>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusClasses(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        <p className="text-stone-600 dark:text-stone-300 mb-6 min-h-[60px]">
          {description}
        </p>

        {/* Progress Bar */}

        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 mb-1">
            <span>Progress: {progress}%</span>
            <span>
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
            </span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                progress < 30
                  ? "bg-red-500"
                  : progress < 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex -space-x-2">
            {team.map((member, index) => (
              <div
                key={index}
                className={`${member.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-stone-800`}
              >
                {member.name.charAt(0)}
              </div>
            ))}
          </div>

          <div className="text-sm text-stone-600 dark:text-stone-400">
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>
      </div>

      {/* Footer with days remaining */}
      {
        <div
          className={`px-4 py-2 text-center ${
            daysRemaining < 7
              ? "bg-red-500/10 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              : daysRemaining < 14
              ? "bg-yellow-500/10 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-blue-500/10 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          }`}
        >
          {daysRemaining > 0
            ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`
            : "Deadline passed!"}
        </div>
      }
    </Link>
  );
}
