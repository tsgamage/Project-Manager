import { forwardRef, useImperativeHandle, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle, Trash2 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleCancel = useCallback(() => {
    onCancel?.();
    handleClose();
  }, [onCancel]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        handleClose();
      },
    };
  });

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm sm:max-w-md mx-auto">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all duration-300"
              aria-label="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                <Trash2 className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{message}</p>
            </div>

            {/* Warning Box */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-red-300 font-medium mb-1">Warning</p>
                  <p className="text-xs sm:text-sm text-red-200">
                    This action will permanently delete the item and cannot be recovered.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift text-sm sm:text-base"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
