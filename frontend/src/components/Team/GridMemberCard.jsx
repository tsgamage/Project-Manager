import { CheckCircle, Clock, Edit, Mail, MoreVertical, Trash2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import DeleteWarningModal from "../UI/Modals/DeleteWarningModal";
import MemberContext from "../../store/member.context";
import toast from "react-hot-toast";
import MemberModal from "../UI/Modals/MemberModal";

export default function GridMemberCard({ member, category }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { deleteMember, updateMember } = useContext(MemberContext);

  const deleteModal = useRef();
  const memberModal = useRef();

  function toggleDropdown(memberId) {
    setOpenDropdown(openDropdown === memberId ? null : memberId);
  }

  // handle clcking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mailSubject = "Project Manager: <your subject here>";
  const mailBody = `Hello ${member.name},\n\n I hope this email finds you well`;
  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        message={`Are you sure you want to delete member ${member.name}? This action cannot be undone.`}
        onCancel={() => deleteModal.current.close()}
        onConfirm={async () => {
          deleteModal.current.close();
          await deleteMember(member._id);
          toast.success("Member deleted successfully");
        }}
      />
      <MemberModal ref={memberModal} memberData={member} onClick={updateMember} />
      <div
        key={member._id}
        className="gradient-card rounded-xl p-4 sm:p-6 hover-lift transition-all duration-300 border border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
            >
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">{member.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
            </div>
          </div>

          {/* Assignment Badge */}
          <div className="flex items-center gap-2">
            {member.assignedProjects.length === 0 ? (
              <span className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Free
              </span>
            ) : (
              <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Assigned
              </span>
            )}
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400">Email:</span>
            <span className="font-medium text-white truncate ml-2">{member.email}</span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400">Projects:</span>
            <span className="font-medium text-white">{member.assignedProjects.length}</span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400">Category:</span>
            <span className="font-medium text-white">{category}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${member.email}?subject=${mailSubject}&body=${mailBody},`}
            className="cursor-pointer active:cursor-progress flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-xs sm:text-sm"
            title="Send Email"
          >
            <Mail className="h-3 w-3" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <div className="relative dropdown-container">
            <button
              onClick={() => toggleDropdown(member._id)}
              className="bg-gray-700/50 hover:bg-gray-700/70 text-gray-400 p-2 rounded-lg transition-all duration-200"
              title="More Options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === member._id && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => memberModal.current.open()}
                  className="cursor-pointer w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => deleteModal.current.open()}
                  className="cursor-pointer w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
