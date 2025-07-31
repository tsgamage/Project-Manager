export default function AddedTask({ task, onDeleteTask }) {
  return (
    <div className="flex cursor-pointer items-center p-4 rounded-xl group hover:bg-gray-700/50 transition-all duration-300 border border-gray-600">
      <input
        type="checkbox"
        checked={false}
        onChange={() => {}}
        value={false}
        className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-400 bg-gray-700"
      />
      <label
        className={`ml-4 flex-1 select-none text-sm sm:text-base ${
          task.completed
            ? "line-through text-gray-500"
            : "text-white"
        }`}
      >
        {task.taskName}
      </label>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 ml-2 transition-all duration-200 rounded-lg hover:bg-red-500/10"
        title="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
