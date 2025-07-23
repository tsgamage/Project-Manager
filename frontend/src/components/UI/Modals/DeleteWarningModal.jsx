import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default forwardRef(function DeleteWarningModal(
  {
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  const handleConfirm = () => {
    onConfirm();
    dialog.current.close();
  };

  const handleCancel = () => {
    onCancel?.();
    dialog.current.close();
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={handleCancel}
      className="fixed inset-0 z-50 w-full max-w-md mx-auto mt-32 rounded-xl shadow-xl backdrop:bg-black/90 animate-fade-in"
    >
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-header-light dark:text-header-dark">
              {title}
            </h3>
            <button
              onClick={handleCancel}
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

          <p className="text-para-light dark:text-para-dark">{message}</p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});
