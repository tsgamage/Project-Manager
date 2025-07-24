import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ICONS = {
  success: (
    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const TITLES = {
  success: "Project Created Successfully!",
  error: "Failed to Create Project",
};

export default forwardRef(function SuccessErrorModal(
  { type = "success", message, onClose, onGoHome, onStay },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="fixed inset-0 z-50 w-full max-w-md sm:mx-auto mx-2 mt-24 sm:mt-32 rounded-xl shadow-xl backdrop:bg-black/90 animate-fade-in"
    >
      <div className="bg-white dark:bg-stone-800 rounded-xl p-4 sm:p-6 flex flex-col items-center w-full">
        <div className="mb-4">{ICONS[type]}</div>
        <h3 className="text-lg sm:text-xl font-semibold text-header-light dark:text-header-dark mb-2 text-center">
          {TITLES[type]}
        </h3>
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mb-6 text-center">
          {message}
        </p>
        {type === "success" ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={onGoHome}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Go to Home
            </button>
            <button
              onClick={onStay}
              className="w-full sm:w-auto px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 font-medium"
            >
              Stay Here
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium mt-2"
          >
            Close
          </button>
        )}
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});
