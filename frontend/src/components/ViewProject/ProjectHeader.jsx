import {
  ArrowLeft,
  Users,
  CheckCircle,
  Target,
  MoreVertical,
  Share2,
  Download,
  BarChart3,
  Calendar,
} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ProjectContext from "../../store/project.context";
import calculateDaysRemaining from "../../util/calculateDaysRemaining.js";
import useDatesRemainingClasses from "../../hooks/useDatesRemainingClasses.jsx";
import useProgress from "../../hooks/useProgress";
import useStatusClasses from "../../hooks/useStatusClasses";

export default function ProjectHeader() {
  const { selectedProject } = useContext(ProjectContext)

  const daysRemaining = calculateDaysRemaining(selectedProject.endDate);
  const { daysRemainingClasses } = useDatesRemainingClasses(daysRemaining);
  const progress = useProgress(selectedProject);
  const { status, statusClasses } = useStatusClasses(progress);


  // Calculate statistics
  const totalTasks = selectedProject.tasks.length;
  const completedTasks = selectedProject.tasks.filter((task) => task.completed).length;
  const teamSize = selectedProject.team.length;
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section className="relative rounded-2xl shadow-lg mb-8">
      <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-10">
        {/* Header */}

        <div className="flex flex-col gap-3 sm:flex-row md:items-center md:justify-between mb-6">
          {/* Title + Back + Status */}
          <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
            <Link
              to="/project/all"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex flex-col min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
                {selectedProject.title}
              </h1>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-3 md:mt-0 shrink-0">
            <button
              className="p-2 bg-gray-800/60 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              className="p-2 bg-gray-800/60 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Download"
            >
              <Download className="h-5 w-5 " />
            </button>
            <button
              className="p-2 bg-gray-800/60 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="More"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses} bg-gray-800/60 flex items-center gap-1`}
          >
            {status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${daysRemainingClasses} bg-gray-800/60 flex items-center gap-1`}
          >
            {daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-white flex items-center gap-1">
              {progress || 0}%
            </span>
            <span className="text-gray-400 text-sm">Completed</span>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm font-medium mt-2 sm:mt-0 flex items-center gap-1">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(selectedProject.startDate).toLocaleDateString()} -{" "}
            {new Date(selectedProject.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-400" : "bg-green-500"
              }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="w-full mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col items-center gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-400">
                <Target className="h-5 w-5" />
                {totalTasks}
              </span>
              <span className="text-xs text-gray-400 mt-1">Tasks</span>
            </div>

            <div className="flex flex-col items-center gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-green-400">
                <CheckCircle className="h-5 w-5" />
                {completedTasks}
              </span>
              <span className="text-xs text-gray-400 mt-1">Completed</span>
            </div>

            <div className="flex flex-col items-center gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-purple-400">
                <Users className="h-5 w-5" />
                {teamSize}
              </span>
              <span className="text-xs text-gray-400 mt-1">Team</span>
            </div>

            <div className="flex flex-col items-center gradient-card rounded-2xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
              <span className="flex items-center gap-2 text-lg sm:text-xl font-bold text-yellow-400">
                <BarChart3 className="h-5 w-5" />
                {productivityScore}%
              </span>
              <span className="text-xs text-gray-400 mt-1">Productivity</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-b border-gray-800 p-6 mt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Project Overview</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl whitespace-pre-wrap text-sm sm:text-base">
            {selectedProject.description || "No description available for this project."}
          </p>
        </div>
      </div>
    </section>
  );
}
