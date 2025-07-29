import { useContext } from "react";
import OtherProjects from "./OtherProjects";
import ProjectContext from "../../store/project.context";
import { X } from "lucide-react";

export default function Sidebar({ isSidebarOpen, onClose }) {
  const { projects } = useContext(ProjectContext);

  return (
    <aside
      className={`${
        isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
      } md:translate-x-0 fixed md:sticky top-0 left-0 z-50 w-72 h-screen bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      {/* Sticky header */}
      <div className="flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-stone-800 p-6 pb-4 border-b border-stone-200 dark:border-stone-700">
        <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">Other Projects</h3>
        <button
          onClick={onClose}
          className="md:hidden text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content area */}
      <div className="p-4">
        <div className="flex flex-col gap-3 w-full">
          {projects.map((project) => (
            <OtherProjects key={project._id} project={project} />
          ))}
        </div>
      </div>
    </aside>
  );
}
