import { useContext, useRef } from "react";
import { Target, CheckCircle, Clock, TrendingUp, Grid2x2Plus } from "lucide-react";
import { Tooltip } from "react-tooltip";
import ProjectContext from "../../../store/project.context.jsx";
import TasksCategoryModal from "../../UI/Modals/tasksCategoryModal.jsx";
import CategoryAccordion from "../../Tasks/CategoryAccordion.jsx";

export default function ProjectTasks({ tasks }) {
  const { tasksCategories, addTaskCategory, selectedProject } = useContext(ProjectContext);
  const taskCategoryModal = useRef();

  const projectTasksCategories = tasksCategories.filter(
    (cat) => cat.projectID === selectedProject._id
  );

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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

          {/* Add Category */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => taskCategoryModal.current.open()}
              className="_add-category cursor-pointer border-1 border-stone-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
            >
              <Grid2x2Plus className="h-4 w-4 text-stone-300" />
              <span className="inline text-stone-300">Add a Category</span>
            </button>
            <Tooltip anchorSelect="._add-category">Add Category</Tooltip>
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
        {projectTasksCategories.length > 0 &&
          projectTasksCategories.map((category) => (
            <CategoryAccordion
              key={category._id}
              category={category}
              tasks={tasks.filter((t) => t.taskCategory === category._id)}
            />
          ))}

        {/* No Tasks Category */}
        <div className="space-y-3 mb-6">
          {projectTasksCategories.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No tasks available</p>
              <p className="text-sm text-gray-500">Add a task category to get started</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
