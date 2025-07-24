import { useContext } from "react";
import OtherProjects from "./OtherProjects";
import ProjectContext from "../../store/project.context";

export default function Sidebar({ isSidebarOpen, onClose }) {
  const { projects } = useContext(ProjectContext);
  
  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 md:z-0 w-72 bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 transition-transform duration-300 ease-in-out overflow-y-auto h-screen`}
    >
      {/* Sticky header */}
      <div className="flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-stone-800 p-4 md:p-6 pb-2 pt-1 border-b border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">
          Other Projects
        </h3>
        <button 
          onClick={onClose} 
          className="md:hidden text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-white"
          aria-label="Close sidebar"
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

      {/* Content area */}
      <div className="p-4 md:p-6 pt-0 flex flex-col h-full">
        <div className="flex flex-col gap-4 p-2 max-h-full items-center">
          {projects.map((project) => (
            <OtherProjects key={project._id} project={project} />
          ))}
        </div>
      </div>
    </aside>
  );
}