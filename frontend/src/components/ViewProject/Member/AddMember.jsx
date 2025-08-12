import { UserPlus } from "lucide-react";

export default function AddMember({ onAdd }) {
  return (
    <div className="group relative">
      <button
        onClick={onAdd}
        className="w-full cursor-pointer bg-gray-700/50 rounded-xl p-3 sm:p-4 hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-blue rounded-full flex items-center justify-center">
            <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white text-sm sm:text-base">
              Add Member
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              add new team member 
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
