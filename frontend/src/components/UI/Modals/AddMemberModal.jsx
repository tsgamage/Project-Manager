import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default forwardRef(function AddMemberModal(
  { onClose, onAddMember },
  ref
) {
  const dialog = useRef();
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
    onClose();
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="fixed inset-0 z-50 w-full max-w-md mx-auto mt-32 rounded-xl shadow-xl backdrop:bg-black/90 animate-fade-in"
    >
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-header-light dark:text-header-dark">
            Add New Team Member
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="member-name"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Name*
            </label>
            <input
              id="member-name"
              type="text"
              name="name"
              value={member.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter member name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="member-role"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Role*
            </label>
            <input
              id="member-role"
              type="text"
              name="role"
              value={member.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter member role"
              required
            />
          </div>

          <div>
            <label
              htmlFor="member-color"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Avatar Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MEMBER_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setMember((prev) => ({ ...prev, color }))}
                  className={`h-8 w-8 rounded-full ${color} flex items-center justify-center ${
                    member.color === color
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  aria-label={`Select ${color
                    .replace("bg-", "")
                    .replace("-500", "")} color`}
                >
                  {member.color === color && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});
