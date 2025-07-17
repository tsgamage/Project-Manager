import OtherProjects from "./OtherProjects";

export default function Sidebar({ isSidebarOpen, onClose }) {
  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-72 bg-stone-800 border-r border-stone-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-header-light dark:text-header-dark">
            Other Projects
          </h3>
          <button
            onClick={onClose}
            className="md:hidden text-stone-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <OtherProjects />
      </div>
    </aside>
  );
}
