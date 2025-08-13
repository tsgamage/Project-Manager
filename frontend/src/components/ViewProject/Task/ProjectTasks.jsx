import { useContext, useRef, useState } from "react";
import Task from "./Task";
import ProjectContext from "../../../store/project.context";
import { Plus, Target, CheckCircle, Clock, TrendingUp, Filter } from "lucide-react";
import TasksCategoryModal from "../../UI/Modals/tasksCategoryModal";
import CategoryAccordion from "../../Tasks/CategoryAccordion";

export default function ProjectTasks({ tasks }) {
  const { tasksCategories, addTaskCategory, selectedProject } = useContext(ProjectContext);
  const [filter, setFilter] = useState("all");
  const taskCategoryModal = useRef();

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
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
    <>
      <TasksCategoryModal
        ref={taskCategoryModal}
        projectID={selectedProject._id}
        onClick={addTaskCategory}
      />

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
                completionRate < 30
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : completionRate < 70
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                    : "bg-gradient-to-r from-green-400 to-green-500"
              }`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Tasks */}
        {tasksCategories.length > 0 &&
          tasksCategories.map((category) => (
            <CategoryAccordion
              key={category._id}
              category={category}
              tasks={tasks.filter((t) => t.taskCategory === category._id)}
            />
          ))}

        {/* No Tasks Category */}
        <div className="space-y-3 mb-6">
          {tasksCategories.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No tasks categories available</p>
              {filter === "all" && (
                <p className="text-sm text-gray-500">Add your first category to get started</p>
              )}
            </div>
          )}
        </div>

        {/* Add Category */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={() => taskCategoryModal.current.open()}
              className="flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task Category</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
