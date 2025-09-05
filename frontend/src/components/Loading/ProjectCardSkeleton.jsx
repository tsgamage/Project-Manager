export default function ProjectCardSkeleton() {
  return (
    <div className="bg-base-200 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-700/20 animate-pulse">
      <div className="p-5 flex-1">
        {/* Header with Status */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="skeleton h-7 w-3/4 rounded"></div>
          <div className="skeleton h-5 w-1/4 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-5 min-h-[50px]">
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-5/6 rounded"></div>
        </div>

        {/* Progress Section */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-2">
            <div className="skeleton h-4 w-1/3 rounded"></div>
            <div className="skeleton h-4 w-1/4 rounded"></div>
          </div>
          <div className="skeleton h-2 w-full rounded-full"></div>
        </div>

        {/* Team Members and Date Range */}
        <div className="flex justify-between items-center mt-5">
          <div className="flex -space-x-1">
            <div className="skeleton w-6 h-6 rounded-full"></div>
            <div className="skeleton w-6 h-6 rounded-full"></div>
            <div className="skeleton w-6 h-6 rounded-full"></div>
          </div>
          <div className="skeleton h-4 w-1/3 rounded"></div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-5 py-3 text-center border-t border-gray-700">
        <div className="flex items-center justify-center gap-2">
          <div className="skeleton h-4 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );
}
