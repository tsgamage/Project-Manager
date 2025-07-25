import { forwardRef } from "react";

export default forwardRef(function Search({ onSearch, onReset, ...props }, ref) {
  return (
    <>
      <div className="flex-1">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
        >
          Search Projects
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-stone-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            type="text"
            ref={ref}
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-8 py-3 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by project name or description..."
            {...props}
          />

          {props.value && props.value.length > 0 && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-2 flex items-center hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              onClick={() => onReset("search")}
              tabIndex={0}
            >
              <svg
                className="h-6 w-6 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l3.536-3.535a1 1 0 111.415 1.414L11.414 10l3.537 3.536a1 1 0 01-1.415 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464A1 1 0 016.464 5.05L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
});
