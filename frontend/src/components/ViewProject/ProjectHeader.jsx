import { Link } from "react-router-dom";
import useProgress from "../../hooks/useProgress.jsx";
import useStatusClasses from "../../hooks/useStatusClasses.jsx";
import { useState } from "react";

export default function ProjectHeader({ project }) {
  const endDate = new Date(project.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  const progress = useProgress(project);
  const { status, statusClasses } = useStatusClasses(progress);
  const [expandText, setExpandText] = useState(false);

  return (
    <>
      <div className="mb-6 pb-6 border-b border-stone-200 dark:border-stone-700">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-header-light dark:text-header-dark">
                {project.title}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Project ID: {project._id}
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <Link
                to="/"
                className="px-4 py-2 sm:px-6 sm:py-3 border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center transition-colors text-sm sm:text-base text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusClasses}`}>
              {status}
            </span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                daysRemaining > 0
                  ? daysRemaining < 7
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    : daysRemaining < 14
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-5">
            {new Date(project.startDate).toLocaleDateString()} -{" "}
            {new Date(project.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
            Progress: {progress || 0}%
          </p>
          <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-header-light dark:text-header-dark mb-3">
          Project Overview
        </h2>
        <p className="text-para-light dark:text-para-dark leading-relaxed">
          {project.description.length < 300 && project.description}
          {project.description.length > 300 &&
            (expandText ? project.description : project.description.slice(0, 300))}
          {project.description.length > 300 && (
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => setExpandText((preValue) => !preValue)}
            >
              {expandText ? " See Less" : " ... See More"}
            </span>
          )}
        </p>
      </div>
    </>
  );
}
