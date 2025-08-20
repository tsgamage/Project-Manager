import { useRef } from "react";
import { toast } from "react-hot-toast";
import DeleteWarningModal from "../../UI/Modals/DeleteWarningModal";
import MemberModal from "../../UI/Modals/MemberModal";
import { Edit, Mail, Target, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteMemberThunk } from "../../../store/member.action";

export default function MemberCard({ member }) {
  const deleteModal = useRef();
  const updateMemberModal = useRef();

  const dispatch = useDispatch();

  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        message={`Are you sure you want to delete member ${member.name}? This action cannot be undone.`}
        onCancel={() => deleteModal.current.close()}
        onConfirm={async () => {
          deleteModal.current.close();
          await dispatch(deleteMemberThunk(member._id));
          toast.success("Member deleted successfully");
        }}
      />

      <MemberModal
        ref={updateMemberModal}
        memberData={member}
      />

      <div className="gradient-card rounded-lg p-4 pl-4 sm:pl-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden">
        {/* Color Gradient Indicator */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${member.color} opacity-80`}></div>
        <div className="flex items-center justify-between">
          {/* Left Section - Member Info */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="mb-1 sm:mb-2">
                <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg truncate">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">{member.role}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1 min-w-0">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>
                    {member.assignedProjects.length}{" "}
                    {member.assignedProjects.length === 1 ? "project" : "projects"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section - Actions */}
          <div className="flex flex-row gap-2 flex-shrink-0">
            <a
              href={`mailto:${member.email}?subject=${`Project Manager: <your subject here>`}&body=${`Hello ${member.name},\n\n I hope this email finds you well`},`}
              className="p-2.5 sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="Send Email"
            >
              <Mail className="max-sm:hidden h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-blue-300" />
            </a>
            <button
              onClick={() => updateMemberModal.current.open()}
              className="p-2.5 sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="Edit"
            >
              <Edit className="h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-blue-300" />
            </button>
            <button
              onClick={() => deleteModal.current.open()}
              className="p-2.5 cursor-pointer sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-red-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
