import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeleteWarningModal from "../UI/Modals/DeleteWarningModal";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteProjectThunk } from "../../store/project.action";
import { projectActions } from "../../store/project.slice";

export default function ProjectActions({ onEdit }) {
  const deleteModal = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDeleteProject() {
    deleteModal.current.open();
  }

  const deleteBtnClasses =
    "px-4 py-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer";
  const downloadBtnClasses =
    "px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2 transition-colors cursor-pointer";

  return (
    <>
      <DeleteWarningModal
        ref={deleteModal}
        message="Are you sure you want to delete this project? This action cannot be undone."
        onCancel={() => deleteModal.current.close()}
        onConfirm={async () => {
          deleteModal.current.close();
          const response = await dispatch(deleteProjectThunk());

          if (response.success) {
            navigate("/project/all");
            toast.success("Project deleted successfully");
            dispatch(projectActions.clearSelectedProjectID());
            dispatch(projectActions.clearSelectedProject());
          } else {
            toast.error(response.message || "Failed to delete project");
          }
        }}
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button onClick={onEdit} className={downloadBtnClasses}>
          <Edit /> Edit Project Info
        </button>
        <button onClick={handleDeleteProject} className={deleteBtnClasses}>
          <Trash2 /> Delete Project
        </button>
      </div>
    </>
  );
}
