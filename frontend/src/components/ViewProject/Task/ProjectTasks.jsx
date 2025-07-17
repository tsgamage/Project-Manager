import { useContext, useState } from "react";
import Task from "./Task";
import ProjectContext from "../../../store/project.context";

// TODO : Handle The CRUD operations for the tasks
//TODO : Make other components work

export default function ProjectTasks({ tasks }) {
  const { addTask } = useContext(ProjectContext);
  const [taskName, setTaskName] = useState("");

  function handleAddTask() {
    if (taskName.trim().length > 0) {
      addTask(taskName.trim());
    }
    setTaskName("");
  }

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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter task description"
        />
        <button
          onClick={handleAddTask}
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
  );
}
