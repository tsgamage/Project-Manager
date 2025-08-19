import { CheckCircle, Circle, Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import DeleteWarningModal from "../UI/Modals/DeleteWarningModal.jsx";

export default function TaskItem({ task, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.taskName);
  const [editedDescription, setEditedDescription] = useState(task.taskDescription);

  const deleteModal = useRef();

  const handleSave = () => {
    if (editedName.length > 100 || editedDescription.length > 500) {
      return;
    }
    onSave(task._id, editedName, editedDescription);
    setIsEditing(false);
  };

  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        onConfirm={() => onDelete(task._id)}
        onCancel={() => deleteModal.current.close()}
      />

      <div
        className={`p-3 rounded-lg border ${!isEditing && task.completed ? "bg-green-500/10 border-green-500/30" : "bg-gray-700/50 border-gray-600"}`}
      >
        <div className="flex items-start sm:gap-4">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-end items-center">
                  <p className="text-xs text-gray-400">{editedName?.length || 0}/100</p>
                </div>
                <textarea
                  type="text"
                  placeholder="Task name*"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  autoComplete="task-name"
                  className={`w-full min-h-10 px-2 py-2 border text-white focus:outline-none focus:ring-1 ${
                    editedName.length > 100
                      ? "focus:ring-red-500 border-red-500 rounded bg-red-800/30"
                      : "focus:ring-blue-500 border-gray-500 rounded bg-gray-800"
                  }`}
                  rows="2"
                />
                <div className="flex justify-end items-center ">
                  <p className="text-xs text-gray-400">{editedDescription?.length || 0}/500</p>
                </div>
                <textarea
                  placeholder="Add a Task description"
                  value={editedDescription}
                  autoComplete="task-description"
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className={`w-full min-h-10 px-2 py-1 border  text-white focus:outline-none focus:ring-1 ${
                    editedDescription.length > 500
                      ? "focus:ring-red-500 border-red-500 rounded bg-red-800/30"
                      : "focus:ring-blue-500 border-gray-500 rounded bg-gray-800"
                  }`}
                  rows="5"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-all duration-200 font-medium"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-all duration-200 font-medium disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70 "
                    disabled={
                      editedName.length === 0 ||
                      editedName.length > 100 ||
                      editedDescription.length > 500
                    }
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="flex justify-between items-center gap-2 flex-shrink-0 mb-4 border-b-1 border-gray-600 pb-2">
                    {!isEditing && (
                      <div className="w-full flex items-center justify-between gap-2">
                        <button onClick={() => onToggle(task._id)}>
                          {task.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-400" />
                          )}
                        </button>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 cursor-pointer text-gray-400 hover:text-white"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteModal.current.open()}
                            className="p-1 cursor-pointer text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h4
                  className={`font-medium text-white ${task.completed ? "line-through opacity-60" : ""}`}
                >
                  {task.taskName}
                </h4>
                <p className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">
                  {task.taskDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
