import ProjectCard from "../components/ProjectCard";
import { DUMMY_DATA } from "../util/dummyData";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <main className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
              Total Projects
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              1
            </p>
          </div>
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              2
            </p>
          </div>
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              3
            </p>
          </div>
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
              Not Started
            </h3>
            <p className="text-3xl font-bold text-stone-600 dark:text-stone-400">
              4
            </p>
          </div>
        </div>

        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-header-light dark:text-header-dark">
              Your Projects
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mt-2">
              Manage and track all your active projects
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* Filters and Search */}
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

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DUMMY_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {DUMMY_DATA.length === 0 && (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-header-light dark:text-header-dark mt-6">
              No projects found
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mt-3 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setFilter("All");
                setSearchQuery("");
              }}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function loader() {
  try {
    const response = await fetch("http://localhost:3000/api/project/");

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 500,
      });
    }
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}
