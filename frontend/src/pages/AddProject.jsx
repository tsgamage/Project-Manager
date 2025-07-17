import { Link } from "react-router-dom";

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header - Mobile responsive */}
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

        {/* Project Form - Mobile responsive */}
        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-4 sm:p-6">
          <form className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Project Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Project Title*
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project title"
                    required
                  />
                </div>

                {/* Project Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Status*
                  </label>
                  <select
                    id="status"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Start Date*
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    End Date*
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the project..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Members - Mobile responsive */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Team Members
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Existing Team Members */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center bg-stone-100 dark:bg-stone-700 rounded-lg p-2 sm:p-3 w-full sm:w-auto">
                    <div className="bg-blue-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                      AJ
                    </div>
                    <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 truncate">
                        Alex Johnson
                      </p>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 truncate">
                        Team Lead
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add Team Member - Mobile responsive */}
                <div className="bg-stone-100 dark:bg-stone-700/50 rounded-lg p-3 sm:p-4 border border-dashed border-stone-300 dark:border-stone-600">
                  <h4 className="text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300 mb-2 sm:mb-3">
                    Add Team Member
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="memberName"
                        className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="memberName"
                        type="text"
                        className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Member name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="memberRole"
                        className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Role
                      </label>
                      <input
                        id="memberRole"
                        type="text"
                        className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Member role"
                      />
                    </div>
                    <div className="sm:col-span-1 flex items-end">
                      <button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors"
                      >
                        Add Member
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks - Mobile responsive */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
                Tasks
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Existing Tasks */}
                <div className="space-y-2">
                  <div className="flex items-center p-2 sm:p-3 bg-stone-100 dark:bg-stone-700 rounded-lg">
                    <input
                      id="task1"
                      type="checkbox"
                      className="h-4 w-4 sm:h-5 sm:w-5 rounded border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-blue-500 focus:ring-blue-400"
                    />
                    <label
                      htmlFor="task1"
                      className="ml-2 sm:ml-3 w-full text-sm sm:text-base text-stone-800 dark:text-stone-200"
                    >
                      Research requirements
                    </label>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add Task - Mobile responsive */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Form Actions - Mobile responsive */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-stone-200 dark:border-stone-700">
              <button
                type="button"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center justify-center transition-colors text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
