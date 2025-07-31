import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, UserPlus, Palette, Check } from "lucide-react";

export default forwardRef(function AddMemberModal(
  { onClose, onAddMember },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [member, setMember] = useState({
    name: "",
    role: "",
    color: "bg-blue-500", // Default color
  });

  const MEMBER_COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!member.name.trim() || !member.role.trim()) return;

    onAddMember(member);

    // Reset form and close
    setMember({ name: "", role: "", color: "bg-blue-500" });
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setMember({ name: "", role: "", color: "bg-blue-500" });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        handleClose();
      },
    };
  });

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-blue rounded-lg sm:rounded-xl flex items-center justify-center">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Add New Team Member
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Invite a new member to your project
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all duration-300"
              aria-label="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="member-name"
                className="block text-sm font-medium text-white mb-2"
              >
                Member Name*
              </label>
              <input
                id="member-name"
                type="text"
                name="name"
                value={member.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter member name"
                required
              />
            </div>

            {/* Role Input */}
            <div>
              <label
                htmlFor="member-role"
                className="block text-sm font-medium text-white mb-2"
              >
                Role*
              </label>
              <input
                id="member-role"
                type="text"
                name="role"
                value={member.role}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="e.g., Developer, Designer, Manager"
                required
              />
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Avatar Color
                </div>
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {MEMBER_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setMember((prev) => ({ ...prev, color }))}
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl ${color} flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      member.color === color
                        ? "ring-2 ring-blue-400 ring-offset-1 sm:ring-offset-2 ring-offset-gray-800"
                        : "hover:ring-2 hover:ring-gray-500"
                    }`}
                    aria-label={`Select ${color
                      .replace("bg-", "")
                      .replace("-500", "")} color`}
                  >
                    {member.color === color && (
                      <Check className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {member.name && (
              <div className="bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600">
                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">Preview:</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${member.color} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">{member.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!member.name.trim() || !member.role.trim()}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 gradient-blue hover:shadow-lg text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
