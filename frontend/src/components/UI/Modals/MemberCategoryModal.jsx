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

export default forwardRef(function AddMemberCategoryModal({ onClick, categoryData }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction, pending] = useActionState(AddMemberAction);
  const [error, setError] = useState("");
  const [resetForm, setResetForm] = useState(false);

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
        handleClose();
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

  async function AddMemberAction(preState, formData) {
    const categoryObj = Object.fromEntries(formData);

    // changing 'categoryName' to 'name'
    const { categoryName: name, ...rest } = categoryObj;
    const updatedObj = { name, ...rest };

    // Name verification moved to separate function for clear view
    const error = verifyName(updatedObj.name);

    if (error) {
      setError(error);
      return categoryObj;
    }

    // checking whether this was a update or a new category and pass necessary data
    let response;
    if (categoryData) {
      response = await onClick(categoryData._id, updatedObj);
    } else {
      response = await onClick(updatedObj);
    }

    // Common response for both update and new category requests
    if (response && response.success) {
      toast.success(response?.message);
      setIsOpen(false);
    } else {
      toast.error(response?.message);
      return categoryObj;
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-sm sm:max-w-md max-h-[85vh] min-h-0 overflow-y-auto flex justify-center">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 border-b border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 gradient-blue rounded-lg sm:rounded-xl flex items-center justify-center">
                <Grid2x2Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  {categoryData ? "Edit Category" : "Add New Member Category"}
                </h3>
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
          <form
            action={formAction}
            className="p-2.5 sm:p-3 lg:p-4 space-y-2.5 sm:space-y-3 lg:space-y-4"
          >
            {/* Name and Role in same row */}
            <ModalInput
              id="categoryName"
              label="Category Name*"
              placeholder="E.g. Developers"
              defaultValue={resetForm ? "" : categoryData ? categoryData.name : formState?.name}
              isError={error}
              onChange={() => setError(null)}
            />
            {error && <p className="text-sm text-red-500 ">{error}</p>}

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <div className="flex items-center gap-2">Category Color</div>
              </label>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 lg:gap-3 p-4  bg-gray-700/50 rounded-lg sm:rounded-xl py-5">
                {MEMBER_COLORS.map((color) => (
                  <label
                    key={color}
                    className={`relative cursor-pointer h-7 w-7 sm:h-8 sm:w-8 lg:h-8 lg:w-8 rounded-lg sm:rounded-xl ${color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-gray-500`}
                    aria-label={`Select ${color.replace("bg-", "").replace("-500", "")} color`}
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
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-2 ring-transparent peer-checked:ring-blue-400 peer-checked:ring-offset-1 sm:peer-checked:ring-offset-2 peer-checked:ring-offset-gray-800 transition-all duration-300" />
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-5 lg:w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
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
