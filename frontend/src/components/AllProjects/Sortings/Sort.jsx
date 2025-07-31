import { forwardRef } from "react";

export default forwardRef(function Sort({ onSetSortOption, onReset, ...props }, ref) {
  return (
    <div>
      {/* Reset Button */}
      <label
        onClick={() => onReset("sort")}
        className="block cursor-pointer group text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
      >
        Sort by
        {props.value && props.value !== "newest" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline ml-2 transition-transform duration-initial ease-in-out group-active:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582M20 20v-5h-.581M19.418 9A7.978 7.978 0 0012 4c-3.042 0-5.824 1.721-7.418 4M4.582 15A7.978 7.978 0 0012 20c3.042 0 5.824-1.721 7.418-4"
            />
          </svg>
        )}
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
