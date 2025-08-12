import { CheckCircle, Circle, Edit, Save, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.taskDescription);

  const handleSave = () => {
    onSave(task._id, editedName, editedDescription);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${!isEditing && task.completed ? "bg-green-500/10 border-green-500/30" : "bg-gray-700/50 border-gray-600"}`}
    >
      <div className="flex items-start gap-4">
        {!isEditing && (
          <button onClick={() => onToggle(task._id)} className="mt-1 flex-shrink-0">
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-2 py-1 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-2 py-1 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="2"
              />
            </div>
          ) : (
            <div>
              <h4
                className={`font-medium text-white ${task.completed ? "line-through opacity-60" : ""}`}
              >
                {task.taskName}
              </h4>
              <p className="text-sm text-gray-400 mt-1">{task.taskDescription}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-1 cursor-pointer text-gray-400 hover:text-white"
            >
              <Save className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 cursor-pointer text-gray-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 cursor-pointer text-gray-400 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
