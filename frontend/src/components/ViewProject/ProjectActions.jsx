import { useContext } from "react";
import ProjectContext from "../../store/project.context";
import { useNavigate } from "react-router-dom";

const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

export default function ProjectActions({ onEdit }) {
  const navigate = useNavigate();
  const { deleteProject } = useContext(ProjectContext);

  function handleDeleteProject() {
    deleteProject();
    navigate("/");
  }
  const editBtnClasses =
    "px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-lg text-stone-800 dark:text-stone-200 flex items-center justify-center gap-2 transition-colors";

  const deleteBtnClasses =
    "px-4 py-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer";

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-end">
      <button onClick={onEdit} className={editBtnClasses}>
        {editIcon} Edit Project
      </button>
      <button onClick={handleDeleteProject} className={deleteBtnClasses}>
        {deleteIcon} Delete Project
      </button>
    </div>
  );
}
