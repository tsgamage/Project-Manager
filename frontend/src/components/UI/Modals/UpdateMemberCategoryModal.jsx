import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
  useActionState,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { X, Palette, Check, Loader, Grid2x2Plus } from "lucide-react";
import ModalInput from "./components/ModalInput";
import { toast } from "react-hot-toast";
import MemberContext from "../../../store/member.context";

export default forwardRef(function AddMemberCategoryModal(props, ref) {
  const [selectedCategoryData, setSelectedCategoryData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [formState, formAction, pending] = useActionState(AddMemberAction, selectedCategoryData);

  const { memberCategories, editMemberCategory } = useContext(MemberContext);

  const MEMBER_COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  const handleClose = useCallback(() => {
    if (!pending) setIsOpen(false);
  }, [pending]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCategoryOpen && !event.target.closest(".category-dropdown")) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  useImperativeHandle(ref, () => {
    return {
      open: (categoryID) => {
        setSelectedCategoryData(memberCategories.filter((cat) => cat._id === categoryID)[0]);
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

  async function AddMemberAction(preState, formData) {
    const categoryObj = Object.fromEntries(formData);

    // changing 'categoryName' to 'name'
    const { categoryName: name, ...rest } = categoryObj;
    const updatedObj = { name, ...rest };

    console.log(updatedObj);

    const response = await editMemberCategory(selectedCategoryData._id, updatedObj);
    if (response.success) {
      toast.success(response.message);
      setIsOpen(false);
    } else {
      toast.error(response.message);
      return categoryObj;
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
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
                  Update Member Category
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
              placeholder="Developers"
              defaultValue={formState?.name || selectedCategoryData?.name}
            />

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Category Color
                </div>
              </label>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 lg:gap-3 p-4">
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
                        formState?.color === color ||
                        selectedCategoryData?.color === color ||
                        color === "bg-blue-500"
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
                {pending ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});
