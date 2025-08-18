import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { X, Search, Users, Plus, Mail, CheckCircle, Clock } from "lucide-react";
import MemberContext from "../../../store/member.context";
import ProjectContext from "../../../store/project.context";

const MemberCard = ({ member, onSelect, isSelected, isDisabled }) => {
  return (
    <div
      onClick={() => !isDisabled && onSelect(member)}
      className={`gradient-card rounded-lg p-3 sm:p-4 border transition-all duration-300 relative overflow-hidden ${
        isDisabled
          ? "border-gray-800 bg-gray-800/50 cursor-not-allowed opacity-50"
          : isSelected
          ? "cursor-pointer border-blue-500 bg-blue-500/10 hover:shadow-lg hover:-translate-y-0.5"
          : "cursor-pointer border-gray-700 hover:border-gray-600 hover:shadow-lg hover:-translate-y-0.5"
      }`}
    >
      {/* Color Gradient Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${member.color} opacity-80`}></div>

      <div className="flex items-center gap-3 mb-3">
        <div
          className={`${member.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
        >
          {member.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm sm:text-base truncate">{member.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
        </div>
        <div className="flex items-center gap-2">
          {isDisabled ? (
            <span className="text-xs bg-gray-600/40 text-gray-400 border border-gray-600 px-2 py-1 rounded-full">
              Already in Project
            </span>
          ) : member.assignedProjects.length === 0 ? (
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

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">{member.email}</span>
        </div>

        {member.assignedProjects.length > 0 && (
          <div className="mt-2">
            <span className="text-gray-400 text-xs">
              {member.assignedProjects.length === 1 ? "Project" : "Projects"}:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {member.assignedProjects.slice(0, 2).map((project, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
                >
                  {project}
                </span>
              ))}
              {member.assignedProjects.length > 2 && (
                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                  +{member.assignedProjects.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SelectedMemberTag = ({ member, onRemove, isDisabled }) => {
  return (
    <div className="flex min-w-fit items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-2 rounded-full text-sm">
      <div
        className={`${member.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold`}
      >
        {member.name.charAt(0)}
      </div>
      <span className="font-medium">{member.name}</span>
      {!isDisabled && (
        <button
          onClick={() => onRemove(member._id)}
          className="ml-1 hover:bg-blue-500/30 rounded-full p-1 transition-colors"
          aria-label={`Remove ${member.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default forwardRef(function AddMemberToProject(props, ref) {
  const { fetchedMembers } = useContext(MemberContext);
  const { addMember, selectedProject } = useContext(ProjectContext);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState(fetchedMembers);
  const [isLoading, setIsLoading] = useState(false);

  // Filter members based on search term
  useEffect(() => {
    const filtered = fetchedMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, fetchedMembers]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      setIsOpen(false);
      setSearchTerm("");
      setSelectedMembers([]);
    }
  }, [isLoading]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleMemberSelect = (member) => {
    setSelectedMembers((prev) => {
      const isAlreadySelected = prev.find((m) => m._id === member._id);
      if (isAlreadySelected) {
        return prev.filter((m) => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prev) => prev.filter((m) => m._id !== memberId));
  };

  const handleAddMembers = async () => {
    if (selectedMembers.length === 0) return;

    setIsLoading(true);
    let selectedMembersIDs = selectedMembers.map((member) => member._id);

    selectedMembersIDs = selectedMembersIDs.filter((id) => !selectedProject.team.includes(id));

    const resData = await addMember(selectedMembersIDs);

    if (resData.success) {
      setIsLoading(false);
    }
    handleClose();
    setIsLoading(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setSearchTerm("");
      // preload already-added members
      const alreadyAdded = fetchedMembers.filter((m) =>
        selectedProject.team.includes(m._id)
      );
      setSelectedMembers(alreadyAdded);
    },
    close: () => {
      handleClose();
    },
  }));

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-3 sm:p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 gradient-blue rounded-lg sm:rounded-xl flex items-center justify-center">
                <Users className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-white">Add Team Members</h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Select members to assign to this project
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50"
              aria-label="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 sm:p-6 overflow-hidden flex flex-col">
            {/* Search Bar */}
            <div className="relative mb-4 flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search members by name, role, category, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Selected Members Tags */}
            {selectedMembers.length > 0 && (
              <div className="mb-4 p-3 pb-5 bg-gray-800/50 rounded-lg border border-gray-700 overflow-x-scroll flex-shrink-0">
                <div className="flex sticky left-0 items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-white">
                    Selected Members ({selectedMembers.length})
                  </span>
                </div>
                <div className="flex gap-2 ">
                  {selectedMembers.map((member) => (
                    <SelectedMemberTag
                      key={member._id}
                      member={member}
                      onRemove={handleRemoveMember}
                      isDisabled={selectedProject.team.includes(member._id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-1 mb-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between flex-shrink-0">
                <span className="text-sm font-medium text-white">
                  Available Members ({filteredMembers.length})
                </span>
              </div>

              {/* Scrollable area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mt-2">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <MemberCard
                      key={member._id}
                      member={member}
                      onSelect={handleMemberSelect}
                      isSelected={selectedMembers.some((m) => m._id === member._id)}
                      isDisabled={selectedProject.team.includes(member._id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No members found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMembers}
              disabled={isLoading || selectedMembers.filter((m) => !selectedProject.team.includes(m._id)).length === 0}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 gradient-blue hover:shadow-lg text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding Members...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add{" "}
                  {
                    selectedMembers.filter(
                      (m) => !selectedProject.team.includes(m._id)
                    ).length
                  }{" "}
                  Member
                  {selectedMembers.filter((m) => !selectedProject.team.includes(m._id)).length !== 1
                    ? "s"
                    : ""}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
