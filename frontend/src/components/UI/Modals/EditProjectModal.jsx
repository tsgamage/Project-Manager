import { forwardRef, useActionState, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return;
  }
};

export default forwardRef(function EditProjectModal({ project, onClose, onSave }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  console.log(`project: `, project);

  async function editAction(preData, formData) {
    const dataObj = Object.fromEntries(formData);
    try {
      await onSave(dataObj);
      onClose();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return { title: "", startDate: "", endDate: "", description: "" };
    } catch {
      return dataObj;
    }
  }

  const [formState, formStateAction, pending] = useActionState(editAction);

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="fixed inset-0 z-50 w-full max-w-md mx-auto mt-32 rounded-xl shadow-xl backdrop:bg-black/90 animate-fade-in"
    >
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-header-light dark:text-header-dark">
            Edit Project
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            aria-label="Close"
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
        <form action={formStateAction} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Project Title*
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project title"
              defaultValue={formState?.title || project.title}
              required
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Start Date*
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={formState?.startDate || formatDate(project.startDate)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              End Date*
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={formState?.endDate || formatDate(project.endDate)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the project..."
              defaultValue={formState?.description || project.description}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            {!pending && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button>
            )}
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-stone-600 disabled:cursor-auto cursor-pointer"
            >
              {pending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});
