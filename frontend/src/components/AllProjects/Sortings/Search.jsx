import { forwardRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";

export default forwardRef(function Search({ onSearch, onReset, ...props }, ref) {
  return (
    <>
      <div className="flex-1">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-white mb-3"
        >
          Search Projects
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            type="text"
            ref={ref}
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Search by project name or description..."
            {...props}
          />

          {props.value && props.value.length > 0 && (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center hover:text-gray-300 transition-colors"
              onClick={() => onReset("search")}
              tabIndex={0}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
            </button>
          )}
        </div>
      </div>
    </>
  );
});
