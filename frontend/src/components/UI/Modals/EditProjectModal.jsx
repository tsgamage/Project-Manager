import { forwardRef, useImperativeHandle, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Edit3, Calendar, FileText, Save } from "lucide-react";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return "";
  }
};

export default forwardRef(function EditProjectModal({ project, onSave }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title || "",
    startDate: formatDate(project.startDate) || "",
    endDate: formatDate(project.endDate) || "",
    description: project.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description.trim()
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setFormData({
      title: project.title || "",
      startDate: formatDate(project.startDate) || "",
      endDate: formatDate(project.endDate) || "",
      description: project.description || "",
    });
  }, [project]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setFormData({
        title: project.title || "",
        startDate: formatDate(project.startDate) || "",
        endDate: formatDate(project.endDate) || "",
        description: project.description || "",
      });
    },
    close: () => {
      handleClose();
    },
  }));

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Full width on mobile, constrained on desktop */}
      <div className="w-full sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 gradient-blue rounded-lg sm:rounded-xl flex items-center justify-center">
                <Edit3 className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-white">Edit Project</h3>
                <p className="text-xs sm:text-sm text-gray-400">Update project details</p>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Project Title*
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-white mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date*
                  </div>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-white mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date*
                  </div>
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description*
                </div>
              </label>
              <textarea
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-y max-h-64 overflow-y-auto"
                placeholder="Describe the project..."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.title.trim() ||
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.description.trim()
                }
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 gradient-blue hover:shadow-lg text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
