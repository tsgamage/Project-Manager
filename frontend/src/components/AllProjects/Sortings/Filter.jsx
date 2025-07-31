import { forwardRef } from "react";
import { RotateCcw } from "lucide-react";

export default forwardRef(function Filter({ onSetFilter, onReset, ...props }, ref) {
  return (
    <div>
      {/* Reset Button */}
      <label
        onClick={() => onReset("filter")}
        className="block cursor-pointer group text-sm font-medium text-white mb-3"
      >
        Filter by
        {props.value && props.value !== "All" && (
          <RotateCcw className="h-4 w-4 inline ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
        )}
      </label>

      <select
        id="filter"
        ref={ref}
        onChange={(e) => onSetFilter(e.target.value)}
        className="block w-full py-4 px-4 border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        {...props}
      >
        <option value="All">All Projects</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Not Started">Not Started</option>
      </select>
    </div>
  );
});
