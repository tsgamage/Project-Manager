import { useState } from "react";
import AddedTask from "./AddedTask";

export default function ProjectTasks({ tasks, onAddTask: setTasks }) {
  const [taskName, setTaskName] = useState("");

  function handleOnChange(event) {
    setTaskName(event.target.value);
  }

  function onAddTask() {
    if (taskName.trim() === "") {
      setTaskName("");
      return;
    }
    const id = Math.random() * Math.random();
    setTasks((preValues) => [...preValues, { id, taskName, completed: false }]);
    setTaskName("");
  }
  function handleDeletetask(id) {
    setTasks((preValues) => preValues.filter((task) => task.id !== id));
  }

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
        Tasks
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <AddedTask key={task.id} task={task} onDeleteTask={handleDeletetask} />
          ))}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task description"
            onChange={handleOnChange}
            value={taskName}
          />
          <button
            type="button"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium flex items-center justify-center transition-colors"
            onClick={onAddTask}
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
  );
}
