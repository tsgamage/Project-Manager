import { Link } from "react-router-dom";
import useProgress from "../../hooks/useProgress";
import useStatusClasses from "../../hooks/useStatusClasses";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import calculateDaysRemaining from "../../util/calculateDaysRemaining";

export default function ProjectListCard({ project }) {
  const { _id, title, description, startDate, endDate, team } = project;

  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);

  const daysRemaining = calculateDaysRemaining(project.endDate);

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
      className="group block"
    >
      <div className="gradient-card rounded-xl p-4 sm:p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          {/* Left Section - Project Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 title={title} className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors duration-200">
                {title}
              </h3>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap border backdrop-blur-sm flex-shrink-0 ${statusClasses}`}
              >
                {status}
              </span>
            </div>

            <p title={description} className="text-sm text-gray-400 truncate mb-3">
              {description || "No description"}
            </p>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ease-out ${progress < 30 ? "bg-gradient-to-r from-red-400 to-red-500" :
                    progress < 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                      "bg-gradient-to-r from-green-400 to-green-500"
                    }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 font-medium min-w-[40px]">
                {progress || 0}%
              </span>
            </div>

            {/* Bottom Info */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className={daysRemaining < 7 ? "text-red-400" : daysRemaining < 14 ? "text-yellow-400" : "text-gray-400"}>
                  {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{team.length} member{team.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Arrow */}
          <div className="flex-shrink-0 ml-4">
            <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-blue-600/20 transition-all duration-200">
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 