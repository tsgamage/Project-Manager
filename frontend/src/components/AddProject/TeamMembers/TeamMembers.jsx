import { useState } from "react";
import AddedMemeber from "./AddedMemeber";

const MEMBER_COLORS = [
  "bg-green-500", // Green
  "bg-blue-500", // Blue
  "bg-red-500", // Red
  "bg-yellow-500", // Yellow
  "bg-purple-500", // Purple
  "bg-pink-500", // Pink
  "bg-indigo-500", // Indigo
  "bg-teal-500", // Teal
  "bg-orange-500", // Orange
  "bg-cyan-500", // Cyan
];

export default function TeamMembers({ members: teamMembers, onAddMember: setTeamMembers }) {
  const [memberColor, setMemberColor] = useState("bg-green-500");
  const [member, setMember] = useState({ name: "", role: "" });

  function onInputChange(event, name) {
    setMember((preData) => {
      return {
        ...preData,
        [name]: event.target.value,
      };
    });
  }
  function handleAddMember() {
    if (member.name.trim() === "" && member.role.trim() === "") {
      setMember({ name: "", role: "" });
      return;
    }
    if (!member.name.trim() || !member.role.trim()) {
      return;
    }
    const id = Math.random() * Math.random();
    setTeamMembers((preData) => [...preData, { id, ...member, color: memberColor }]);
    setMember({ name: "", role: "" });
    setMemberColor("bg-green-500");
  }
  function handleDeleteMember(id) {
    console.log(id);
    setTeamMembers((preData) => preData.filter((member) => member.id !== id));
  }

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-3 sm:mb-4">
        Team Members
      </h3>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {teamMembers.length > 0 &&
            teamMembers.map((member) => {
              return (
                <AddedMemeber
                  key={member.id}
                  onDelete={handleDeleteMember}
                  id={member.id}
                  member={member}
                />
              );
            })}
        </div>

        {/* Add Team Member */}
        <div className="bg-stone-100 dark:bg-stone-700/50 rounded-lg p-3 sm:p-4 border border-dashed border-stone-300 dark:border-stone-600">
          <h4 className="text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300 mb-2 sm:mb-3">
            Add Team Member
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="sm:col-span-1">
              <label
                htmlFor="memberName"
                className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
              >
                Name
              </label>
              <input
                id="memberName"
                type="text"
                className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Member name"
                onChange={(event) => onInputChange(event, "name")}
                value={member.name}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="memberRole"
                className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
              >
                Role
              </label>
              <input
                id="memberRole"
                type="text"
                className="block w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Member role"
                onChange={(event) => onInputChange(event, "role")}
                value={member.role}
              />
            </div>
            {/* Color Picker */}
            <div className="sm:col-span-1">
              <label
                htmlFor="memberColor"
                className="block text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
              >
                Color
              </label>
              <div className="flex flex-wrap gap-1">
                {MEMBER_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={color.replace("bg-", "").replace("-500", "")}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${color} ${
                      memberColor === color
                        ? "ring-2 ring-blue-500 border-blue-500"
                        : "border-stone-300 dark:border-stone-600"
                    }`}
                    onClick={() => setMemberColor(color)}
                  >
                    {memberColor === color && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-1 flex items-end">
              <button
                onClick={handleAddMember}
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
