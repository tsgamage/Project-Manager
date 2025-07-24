import { forwardRef } from "react";

export default forwardRef(function Filter({ onSetFilter, ...props }, ref) {
  return (
    <div>
      <label
        htmlFor="filter"
        className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
      >
        Filter by Status
      </label>
      <select
        id="filter"
        ref={ref}
        onChange={(e) => onSetFilter(e.target.value)}
        className="block w-full py-3 px-4 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
