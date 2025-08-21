import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
  useActionState,
} from "react";
import { createPortal } from "react-dom";
import { X, Check, Loader, Grid2x2Plus } from "lucide-react";
import ModalInput from "./components/ModalInput";
import { toast } from "react-hot-toast";
import colors from "../../../util/colors";
import { useDispatch } from "react-redux";
import { createTaskCategoryThunk, updateTaskCategoryThunk } from "../../../store/project.action";

export default forwardRef(function TasksCategoryModal({ projectID, categoryData }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction, pending] = useActionState(AddTaskCategoryAction);
  const [error, setError] = useState("");
  const [resetForm, setResetForm] = useState(false);

  const dispatch = useDispatch();

  const MEMBER_COLORS = colors.memberColors;

  const handleClose = useCallback(() => {
    if (!categoryData) {
      setResetForm(true);
    }
    if (!pending) {
      setIsOpen(false);
      setError("");
    }
  }, [pending, categoryData]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => handleClose(),
  }));

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

  function verifyName(name) {
    if (!name || name.trim() === "") {
      return "Role is required";
    }
    if (name.length < 3) {
      return "Role must be at least 3 characters long";
    }
    // eslint-disable-next-line no-useless-escape
    if (!/^[a-zA-Z0-9 /,|()\[\]\\-]+$/.test(name.name)) {
      return "Role can only contain letters, numbers, spaces, and these symbols: / , | - ( ) [ ] \\";
    }
  }

  async function AddTaskCategoryAction(preState, formData) {
    const categoryObj = Object.fromEntries(formData);
    const { taskCategoryName: name, ...rest } = categoryObj;
    const updatedObj = { projectID, name, ...rest };

    const validationError = verifyName(updatedObj.name);
    if (validationError) {
      setError(validationError);
      return categoryObj;
    }

    let response;
    if (categoryData) {
      response = await dispatch(updateTaskCategoryThunk(categoryData._id, updatedObj));
    } else {
      response = await dispatch(createTaskCategoryThunk(updatedObj));
    }

    if (response?.success) {
      toast.success(response?.message);
      setIsOpen(false);
    } else {
      toast.error(response?.message);
      return categoryObj;
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm sm:max-w-md flex justify-center">
        <div className="glass w-full max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 gradient-blue rounded-xl flex items-center justify-center">
                <Grid2x2Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {categoryData ? "Edit Tasks Category" : "Add New Tasks Category"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-xl transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body (scrollable) */}
          <form action={formAction} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
            {/* Category Name */}
            <ModalInput
              id="taskCategoryName"
              label="Tasks Category Name*"
              placeholder="E.g. Backend Tasks"
              defaultValue={resetForm ? "" : categoryData ? categoryData.name : formState?.name}
              isError={error}
              onChange={() => setError("")}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tasks Category Color*
              </label>
              <div className="grid grid-cols-5 gap-2 bg-gray-700/50 rounded-xl p-3 sm:p-4">
                {MEMBER_COLORS.map((color) => (
                  <label
                    key={color}
                    className={`relative cursor-pointer h-8 w-8 sm:h-9 sm:w-9 rounded-xl ${color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-gray-500`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="sr-only peer"
                      defaultChecked={
                        categoryData?.color === color ||
                        formState?.color === color ||
                        color === "bg-green-500"
                      }
                    />
                    <div className="absolute inset-0 rounded-xl ring-2 ring-transparent peer-checked:ring-blue-400 peer-checked:ring-offset-2 peer-checked:ring-offset-gray-800" />
                    <Check className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={pending}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 border border-gray-600 text-gray-300 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300
                  hover:bg-gray-700
                  ${pending ? "bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-60" : ""}
                `}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={pending}
                className="cursor-pointer disabled:cursor-not-allowed flex-1 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 gradient-blue hover:shadow-lg text-white rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {pending && <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" />}
                {pending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
