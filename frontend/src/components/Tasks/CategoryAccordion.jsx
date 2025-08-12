import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CategoryAccordion({ category, tasks, projectTitle, onTaskAction }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTaskToggle = (taskId) => onTaskAction("toggle", category._id, { taskId });
  const handleTaskDelete = (taskId) => onTaskAction("delete", category._id, { taskId });
  const handleTaskSave = (taskId, name, description) =>
    onTaskAction("save", category._id, { taskId, name, description });

  return (
    <div className="glass rounded-2xl shadow-lg border border-gray-700 overflow-hidden mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: category.color }}
          ></div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <p className="text-sm text-gray-400">Project: {projectTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Edit category ${category._id}`);
            }}
            className="p-1 text-gray-400 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Delete category ${category._id}`);
            }}
            className="p-1 text-gray-400 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-700 p-4 space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleTaskToggle}
              onDelete={handleTaskDelete}
              onSave={handleTaskSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
