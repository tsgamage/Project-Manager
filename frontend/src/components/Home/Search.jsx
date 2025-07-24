export default function Search({ setFilter, setSortOption }) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
          >
            Search Projects
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-stone-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by project name or description..."
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
          >
            Filter by Status
          </label>
          <select
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full py-3 px-4 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Projects</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
          >
            Sort by
          </label>
          <select
            id="sort"
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full py-3 px-4 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="deadline">Closest Deadline</option>
          </select>
        </div>
      </div>
    </div>
  );
}
