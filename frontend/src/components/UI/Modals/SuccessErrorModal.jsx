import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, Home, ArrowLeft, X } from "lucide-react";

const ICONS = {
  success: CheckCircle,
  error: XCircle,
};

const TITLES = {
  success: "Success!",
  error: "Error",
};

const COLORS = {
  success: {
    icon: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30",
    gradient: "from-green-500 to-green-600",
    hover: "hover:from-green-600 hover:to-green-700",
  },
  error: {
    icon: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    gradient: "from-red-500 to-red-600",
    hover: "hover:from-red-600 hover:to-red-700",
  },
};

export default forwardRef(function SuccessErrorModal(
  { type = "success", message, onClose, onGoHome, onStay },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = ICONS[type];
  const colors = COLORS[type];

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => handleClose(),
  }));

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xs sm:max-w-md mx-auto">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-7 h-7 sm:w-10 sm:h-10 ${colors.bg} ${colors.border} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                <IconComponent className={`h-3.5 w-3.5 sm:h-5 sm:w-5 ${colors.icon}`} />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-white">
                  {TITLES[type]}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {type === "success" ? "Operation completed" : "Something went wrong"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg sm:rounded-xl transition-all duration-300"
              aria-label="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.bg} rounded-full flex items-center justify-center border ${colors.border}`}>
                <IconComponent className={`h-8 w-8 sm:h-10 sm:w-10 ${colors.icon}`} />
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {type === "success" ? (
                <>
                  <button
                    onClick={onGoHome}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go to Home
                  </button>
                  <button
                    onClick={onStay}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Stay Here
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClose}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
