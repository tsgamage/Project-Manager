import { useContext } from "react";
import ProjectContext from "../../../store/project.context";

export default function Task({ task }) {
  const { removeTask } = useContext(ProjectContext);

  return (
    <li>
      <div className="flex items-center p-3 rounded-lg group hover:bg-stone-50 dark:hover:bg-stone-700/50">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => {}}
          className="h-4 w-4 rounded border-stone-300 dark:border-stone-600 text-blue-500 focus:ring-blue-400"
        />
        <span
          className={`ml-3 flex-1 ${
            task.completed
              ? "line-through text-stone-500 dark:text-stone-500"
              : "text-stone-800 dark:text-stone-200"
          }`}
        >
          {task.taskName}
        </span>
        <button
          onClick={() => removeTask(task._id)}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 ml-2 transition-opacity"
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
    </li>
  );
}
