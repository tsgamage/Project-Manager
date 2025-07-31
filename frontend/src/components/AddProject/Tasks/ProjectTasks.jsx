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
    <div className="space-y-4">
      {tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <AddedTask key={task.id} task={task} onDeleteTask={handleDeletetask} />
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          className="flex-1 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder="Enter task description"
          onChange={handleOnChange}
          value={taskName}
        />
        <button
          type="button"
          className="gradient-blue cursor-pointer hover:shadow-lg text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover-lift"
          onClick={onAddTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3"
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
