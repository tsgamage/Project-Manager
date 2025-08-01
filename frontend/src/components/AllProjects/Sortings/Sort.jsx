import { forwardRef } from "react";
import { RotateCw } from "lucide-react";

export default forwardRef(function Sort({ onSetSortOption, onReset, ...props }, ref) {
  return (
    <div>
      {/* Reset Button */}
      <label
        onClick={() => onReset("sort")}
        className="block cursor-pointer group text-sm font-medium text-white mb-3"
      >
        Sort by
        {props.value && props.value !== "newest" && (
          <RotateCw className="h-4 w-4 inline ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
        )}
      </label>

      <select
        id="sort"
        ref={ref}
        onChange={(e) => onSetSortOption(e.target.value)}
        className="block w-full py-4 px-4 border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        {...props}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="deadline">Closest Deadline</option>
      </select>
    </div>
  );
});
