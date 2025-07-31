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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
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
      <div className="bg-gray-700/50 rounded-xl p-4 sm:p-6 border border-dashed border-gray-600">
        <h4 className="text-lg font-medium text-white mb-4">
          Add Team Member
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-1">
            <label
              htmlFor="memberName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              id="memberName"
              type="text"
              className="block w-full px-4 py-3 text-sm border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Member name"
              onChange={(event) => onInputChange(event, "name")}
              value={member.name}
            />
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="memberRole"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Role
            </label>
            <input
              id="memberRole"
              type="text"
              className="block w-full px-4 py-3 text-sm border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Member role"
              onChange={(event) => onInputChange(event, "role")}
              value={member.role}
            />
          </div>
          {/* Color Picker */}
          <div className="sm:col-span-1">
            <label
              htmlFor="memberColor"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {MEMBER_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={color.replace("bg-", "").replace("-500", "")}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${color} ${
                    memberColor === color
                      ? "ring-2 ring-blue-500 border-white"
                      : "border-gray-600 hover:border-gray-500"
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
              className="w-full gradient-blue hover:shadow-lg text-white px-4 py-3 text-sm rounded-xl font-medium transition-all duration-300 hover-lift"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
