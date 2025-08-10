import { UserPlus, Users } from "lucide-react";

export default function NoMemberCard({ modal }) {
  return (
    <div className="text-center py-4 sm:py-6">
      <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-card rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mb-2">No members in this category</p>
      <button
        onClick={() => modal.current.open()}
        className="text-xs cursor-pointer bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 mx-auto"
      >
        <UserPlus className="h-3 w-3" />
        Add Member
      </button>
    </div>
  );
}
