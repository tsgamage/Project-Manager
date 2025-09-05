const ProjectListCardSkeleton = () => (
  <div className="block">
    <div className="bg-base-100 rounded-xl p-4 sm:p-5 border border-base-200 animate-pulse">
      <div className="flex items-center justify-between">
        {/* Left Section - Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-base-300 h-6 w-1/2 rounded"></div>
            <div className="bg-base-300 h-5 w-1/4 rounded-full"></div>
          </div>

          <div className="bg-base-300 h-4 w-4/5 rounded mb-4"></div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-base-300 rounded-full h-2"></div>
            <div className="bg-base-300 h-4 w-10 rounded"></div>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-4 text-xs">
            <div className="bg-base-300 h-4 w-1/4 rounded"></div>
            <div className="bg-base-300 h-4 w-1/6 rounded"></div>
            <div className="bg-base-300 h-4 w-1/5 rounded"></div>
          </div>
        </div>

        {/* Right Section - Arrow */}
        <div className="flex-shrink-0 ml-4">
          <div className="w-8 h-8 rounded-lg bg-base-300"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProjectListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <ProjectListCardSkeleton key={i} />
      ))}
    </div>
  );
}