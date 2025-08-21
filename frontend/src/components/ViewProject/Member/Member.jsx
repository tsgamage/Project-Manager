import { useRef } from "react";
import DeleteWarningModal from "../../UI/Modals/DeleteWarningModal.jsx";
import { Trash2, Mail, Calendar, Activity, MoreVertical, Crown } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeMemberFromProjectThunk } from "../../../store/project.action.js";

export default function Memeber({ member }) {
  const deleteModal = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        title={`Remove ${member.name}?`}
        message={`Are you sure you want to remove ${member.name} from this Project?`}
        onConfirm={() => dispatch(removeMemberFromProjectThunk(member._id))}
        onCancel={() => deleteModal.current.close()}
      />

      <div className="group relative">
        <div className="bg-gray-700/50 rounded-xl p-3 sm:p-4 hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base ${member.color}`}
                >
                  {member.name.charAt(0)}
                </div>
                {member.isLead && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-white text-sm sm:text-base">{member.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
              </div>
            </div>

            <button
              onClick={() => deleteModal.current.open()}
              className="p-1 cursor-pointer text-gray-400 hover:text-red-400 transition-colors"
              title="Remove member from this project"
            >
              <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {member.email && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <Mail className="h-3 w-3" />
                <span className="truncate">{member.email}</span>
              </div>
            )}

            {member.joinedDate && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
              </div>
            )}

            {member.status && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Activity className="h-3 w-3" />
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === "active"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : member.status === "busy"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            )}
          </div>

          {member.assignedTasks && member.assignedTasks.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-600">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Assigned Tasks</span>
                <span className="text-white font-medium">{member.assignedTasks.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
