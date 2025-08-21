import { useRef } from "react";
import DeleteWarningModal from "../../UI/Modals/DeleteWarningModal";
import { CheckCircle, Circle, Trash2, Edit3, Clock, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeTaskFromProjectThunk, toggleSelectTaskThunk } from "../../../store/project.action";

export default function Task({ task }) {
  const deleteModal = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={() => dispatch(removeTaskFromProjectThunk(task._id))}
        onCancel={() => deleteModal.current.close()}
      />

      <div className="group">
        <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500">
          <button
            onClick={() => dispatch(toggleSelectTaskThunk(task._id))}
            className="flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle className="h-6 w-6 text-green-400 hover:text-green-300 transition-colors" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 hover:text-blue-400 transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p
                className={`font-medium text-sm sm:text-base transition-all duration-300 ${
                  task.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {task.taskName}
              </p>
              {task.priority === "high" && <Star className="h-4 w-4 text-red-400 fill-current" />}
            </div>

            {task.description && (
              <p
                className={`text-sm mt-1 transition-all duration-300 ${
                  task.completed ? "line-through text-gray-600" : "text-gray-400"
                }`}
              >
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-500">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => deleteModal.current.open()}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
