import { forwardRef } from "react";

export default forwardRef(function Sort({ onSetSortOption, ...props }, ref) {
  return (
    <div>
      <label
        htmlFor="sort"
        className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
      >
        Sort by
      </label>
      <select
        id="sort"
        ref={ref}
        onChange={(e) => onSetSortOption(e.target.value)}
        className="block w-full py-3 px-4 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...props}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="deadline">Closest Deadline</option>
      </select>
    </div>
  );
});
