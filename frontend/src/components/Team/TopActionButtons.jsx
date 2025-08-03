import { ChevronDown, ChevronRight, Grid2x2Plus, Grid3X3, List, UserPlus } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function TopActionButtons({
  onAddMember,
  onAddCategory,
  viewMode,
  onViewModChange,
  groupedMembers,
  isExpanded,
  toggleExpandAll,
}) {
  return (
    <div className="flex items-center gap-3">
      {/* View Toggle Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModChange("grid")}
          className={`_grid-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${
            viewMode === "grid"
              ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
              : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
          }`}
          title="Grid View"
        >
          <Grid3X3 className="h-4 w-4" />
        </button>
        <Tooltip anchorSelect="._grid-view">Grid View</Tooltip>

        <button
          onClick={() => onViewModChange("list")}
          className={`_list-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${
            viewMode === "list"
              ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
              : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
          }`}
          title="List View"
        >
          <List className="h-4 w-4" />
        </button>
        <Tooltip anchorSelect="._list-view">List View</Tooltip>
      </div>

      {/* Expand All Button - Only show in list view */}
      {viewMode === "list" &&
        Object.keys(groupedMembers).length > 0 && (
          <>
            <button
              onClick={toggleExpandAll}
              className="text-xs bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronRight className="h-3 w-3" />
                  Expand All
                </>
              )}
            </button>
          </>
        )}

      {/* Add Member Button */}
      <button
        onClick={onAddMember}
        className="_add-member cursor-pointer gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover-lift"
      >
        <UserPlus className="h-4 w-4" />
        <span className="hidden lg:inline">Add Member</span>
      </button>
      <Tooltip anchorSelect="._add-member">Add Member</Tooltip>
      <button
        onClick={onAddCategory}
        className="_add-category cursor-pointer border-1 border-transparent hover:border-1 hover:border-stone-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
      >
        <Grid2x2Plus className="h-4 w-4 text-stone-300" />
        <span className="hidden lg:inline text-stone-300">Add a Category</span>
      </button>
      <Tooltip anchorSelect="._add-category">Add Category</Tooltip>
    </div>
  );
}
