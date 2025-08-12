import { Link } from "react-router-dom";
import useProgress from "../../hooks/useProgress";
import useStatusClasses from "../../hooks/useStatusClasses";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import calculateDaysRemaining from "../../util/calculateDaysRemaining";
import useDatesRemainingClasses from "../../hooks/useDatesRemainingClasses";
import { useContext } from "react";
import MemberContext from "../../store/member.context";

export default function ProjectCard({ project }) {
  const { _id, title, description, startDate, endDate, team } = project;
  const { fetchedMembers } = useContext(MemberContext);

  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);
  const daysRemaining = calculateDaysRemaining(project.endDate);
  const { daysRemainingClasses: bottomPartClasses } = useDatesRemainingClasses(
    daysRemaining,
    progress
  );

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
      className="gradient-card rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200 ease-out h-full flex flex-col hover-lift border border-gray-700 group"
    >
      <div className="p-5 flex-1">
        {/* Header with Status */}
        <div className="flex justify-between items-start mb-4">
          <h3
            title={title}
            className="text-lg font-bold text-white truncate group-hover:text-blue-300 transition-colors duration-200"
          >
            {title}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap border backdrop-blur-sm ${statusClasses}`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p title={description} className="text-gray-300 mb-5 min-h-[50px] leading-relaxed text-sm">
          {description?.length > 60 ? description.slice(0, 60) + "..." : description}
        </p>

        {/* Progress Section */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Progress: {progress || 0}%
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                progress < 30
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : progress < 70
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                    : "bg-gradient-to-r from-green-400 to-green-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Team Members and Date Range */}
        <div className="flex justify-between items-center mt-5">
          <div className="flex -space-x-1">
            {team.length > 0 &&
              team.map((memberID) => {
                const member = fetchedMembers.filter((m) => m._id === memberID)[0];
                return (
                  <div key={memberID}>
                    <div
                      title={member.name}
                      className={`_${memberID} ${member.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold border border-gray-800 shadow-md transition-transform duration-200 hover:scale-105`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <Tooltip anchorSelect={`._${memberID}`} place="bottom-end">
                      {member.name}
                    </Tooltip>
                  </div>
                );
              })}
            {team.length === 0 && <span className="text-xs text-gray-400">No team members</span>}
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className={`px-5 py-3 text-center border-t border-gray-700 ${bottomPartClasses}`}>
        <div className="flex items-center justify-center gap-2">
          {progress === 100 ? (
            <>
              <CheckCircle className="h-3 w-3" />
              <span className="font-medium text-xs">Project completed!</span>
            </>
          ) : daysRemaining > 0 ? (
            <>
              <Clock className="h-3 w-3" />
              <span className="font-medium text-xs">
                {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
              </span>
            </>
          ) : (
            <>
              <Clock className="h-3 w-3" />
              <span className="font-medium text-xs">Deadline passed!</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
