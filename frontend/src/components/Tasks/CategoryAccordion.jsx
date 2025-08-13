import { ChevronDown, ChevronRight, Edit, Plus, Save, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import ProjectContext from "../../store/project.context";
import { toast } from "react-hot-toast";

export default function CategoryAccordion({ category, tasks, projectTitle, onTaskAction }) {
  const { addTask } = useContext(ProjectContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleTaskToggle = (taskId) => onTaskAction("toggle", category._id, { taskId });
  const handleTaskDelete = (taskId) => onTaskAction("delete", category._id, { taskId });
  const handleTaskSave = (taskId, name, description) =>
    onTaskAction("save", category._id, { taskId, name, description });

  async function onAddTask() {
    const taskObj = {
      taskName: editedName,
      taskCategory: category._id,
      taskDescription: editedDescription,
      completed: false,
    };
    const resData = await addTask(taskObj);

    if (resData) {
      setEditedName("");
      setEditedDescription("");
      setIsAddingTask(false);
    } else {
      console.log(resData.message);
      toast.error(resData.message);
    }
  }

  return (
    <div className="glass rounded-2xl shadow-lg border border-gray-700 overflow-hidden mb-4">
      <div
        onClick={() => {
          setIsExpanded((preValue) => !preValue);
          setIsAddingTask(false);
        }}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-2.5 h-2.5 rounded-full ${category ? category?.color : ""}`}></div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            {projectTitle && <p className="text-sm text-gray-400">Project: {projectTitle}</p>}
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
      </div>

      {isExpanded && (
        <div className="border-t border-gray-700 p-4 space-y-3">
          {!isAddingTask && (
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-all duration-200 font-medium"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus className="h-4 w-4" />
              Add New Task
            </button>
          )}

          {isAddingTask && (
            <div className="p-4 rounded-lg border transition-all duration-200 bg-gray-700/50 border-gray-600">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Task name*"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      autoComplete="task-name"
                      className="w-full px-2 py-1 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Task description"
                      value={editedDescription}
                      autoComplete="task-description"
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full min-h-10 px-2 py-1 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows="2"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <button
                    onClick={onAddTask}
                    className="p-1 cursor-pointer text-gray-400 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingTask(false);
                      setEditedName("");
                      setEditedDescription("");
                    }}
                    className="p-1 cursor-pointer text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

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
