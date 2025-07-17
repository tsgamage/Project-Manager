import Task from "./Task";

export default function ProjectTasks({ tasks }) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm p-4 md:p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-header-light dark:text-header-dark">
          Project Tasks
        </h2>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {tasks.filter((t) => t.completed).length} of {tasks.length} completed
        </span>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>

      <button className="mt-6 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center justify-center">
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
        Add New Task
      </button>
    </div>
  );
}
