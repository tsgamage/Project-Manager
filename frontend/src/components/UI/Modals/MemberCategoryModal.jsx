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
import {
  createNewMemberCategoryThunk,
  updateMemberCategoryThunk,
} from "../../../store/member.action";

export default forwardRef(function AddMemberCategoryModal({ categoryData }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction, pending] = useActionState(AddMemberAction);
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
      response = await dispatch(updateMemberCategoryThunk(categoryData._id, updatedObj));
    } else {
      response = await dispatch(createNewMemberCategoryThunk(updatedObj));
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
      className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md mx-auto max-h-[90dvh] overflow-y-auto">
        <div className="glass rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 gradient-blue rounded-lg flex items-center justify-center">
                <Grid2x2Plus className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {categoryData ? "Edit Category" : "New Category"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form action={formAction} className="p-4 space-y-4">
            {/* Category Name Input */}
            <ModalInput
              id="categoryName"
              label="Category Name*"
              placeholder="E.g. Developers"
              defaultValue={resetForm ? "" : categoryData ? categoryData.name : formState?.name}
              isError={error}
              onChange={() => setError("")}
            />
            {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

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
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={pending}
                className={`flex-1 px-4 py-2.5 border border-gray-600 text-gray-300 rounded-lg font-medium transition-all ${
                  pending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className={`flex-1 px-4 py-2.5 gradient-blue text-white rounded-lg font-medium transition-all hover-lift flex items-center justify-center gap-2 ${
                  pending ? "opacity-50" : ""
                }`}
              >
                {pending && <Loader className="animate-spin h-4 w-4" />}
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
