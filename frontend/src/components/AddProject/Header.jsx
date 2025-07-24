import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center sm:gap-6 sm:mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-header-light dark:text-header-dark">
          Add New Project
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 sm:mt-2">
          Fill in the details to create a new project
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
  );
}
