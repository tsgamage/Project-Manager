import { useContext, useState } from "react";
import Task from "./Task";
import ProjectContext from "../../../store/project.context";
import { Plus, Target, CheckCircle, Clock, TrendingUp, Filter } from "lucide-react";

export default function ProjectTasks({ tasks }) {
  const { addTask } = useContext(ProjectContext);
  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("all");

  function handleAddTask() {
    if (taskName.trim().length > 0) {
      addTask(taskName.trim());
      setTaskName("");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "pending":
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="glass rounded-2xl shadow-lg border border-gray-700 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Project Tasks
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              {completedTasks} completed
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {pendingTasks} pending
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {completionRate}% done
            </span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-white">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              completionRate < 30 ? "bg-gradient-to-r from-red-400 to-red-500" : 
              completionRate < 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : 
              "bg-gradient-to-r from-green-400 to-green-500"
            }`}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3 mb-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">
              {filter === "all" ? "No tasks available" : 
               filter === "completed" ? "No completed tasks" : "No pending tasks"}
            </p>
            {filter === "all" && (
              <p className="text-sm text-gray-500">Add your first task to get started</p>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))
        )}
      </div>

      {/* Add Task */}
      <div className="border-t border-gray-700 pt-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter task description..."
          />
          <button
            onClick={handleAddTask}
            disabled={!taskName.trim()}
            className="flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
