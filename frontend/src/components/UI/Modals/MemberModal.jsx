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
import { toast } from "react-hot-toast";
import { X, Check, Loader, ChevronDown, Plus } from "lucide-react";
import ModalInput from "./components/ModalInput.jsx";
import MemberContext from "../../../store/member.context.jsx";
import colors from "../../../util/colors.js";

export default forwardRef(function AddMemberModal({ onClick, onSelectionClick, memberData }, ref) {
  const { fetchedMemberCategories } = useContext(MemberContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(memberData ? memberData.categoryID : "");
  const [errors, setErrors] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const [formState, formAction, pending] = useActionState(AddMemberAction);

  const MEMBER_COLORS = colors.memberColors;

  const handleClose = useCallback(() => {
    if (!pending) {
      setIsOpen(false);
      setIsCategoryOpen(false);
      setSelectedCategory("");
      setErrors({});
    }
    if (!memberData) {
      setResetForm(true);
    }
  }, [pending, memberData]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

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
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        handleClose();
      },
    };
  });

  if (!isOpen) return null;

  // --- FORM VALIDATION LOGIC ---
  function validateFormData(formData) {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters, numbers, and spaces";
    }
    if (!formData.role || formData.role.trim() === "") {
      newErrors.role = "Role is required";
    }
    if (formData.role.length < 3) {
      newErrors.role = "Role must be at least 3 characters long";
    }
    // eslint-disable-next-line no-useless-escape
    if (!/^[a-zA-Z0-9 /,|()\[\]\\-]+$/.test(formData.role)) {
      newErrors.role =
        "Role can only contain letters, numbers, spaces, and these symbols: / , | - ( ) [ ] \\";
    }
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (!formData.color || formData.color.trim() === "") {
      newErrors.color = "Color is required";
    }
    if (!formData.categoryID || formData.categoryID.trim() === "") {
      newErrors.categoryID = "Category is required";
    }
    if (formData.email && formData.email.trim() !== "") {
      // Simple email regex for validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    setErrors(newErrors);
    return newErrors;
  }

  async function AddMemberAction(preState, formData) {
    setResetForm(false);
    setErrors({});

    const memberObj = Object.fromEntries(formData);
    const validationErrors = validateFormData(memberObj);

    // Don't proceed if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return memberObj;
    }

    // Actually call the onClick handler (remove quotes and await)
    let response;
    if (memberData) {
      response = await onClick(memberData._id, memberObj);
    } else {
      response = await onClick(memberObj);
    }

    if (response && response.success) {
      handleClose();
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
      return memberObj;
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
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  {memberData ? "Edit Member" : "Add New Member"}
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
            key={resetForm}
            action={formAction}
            className="p-2.5 sm:p-3 lg:p-4 space-y-2.5 sm:space-y-3 lg:space-y-4"
          >
            {/* Name and Role in same row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <ModalInput
                id="name"
                label="Member Name*"
                placeholder="Enter member name"
                defaultValue={resetForm ? "" : memberData ? memberData.name : formState?.name}
                isError={errors.name}
                onChange={() => setErrors({ ...errors, name: null })}
              />
              <ModalInput
                id="role"
                label="Role*"
                placeholder="Developer"
                defaultValue={resetForm ? "" : memberData ? memberData.role : formState?.role}
                isError={errors.role}
                onChange={() => setErrors({ ...errors, role: null })}
              />
            </div>

            <ModalInput
              id="email"
              label="Email*"
              placeholder="Enter member email"
              defaultValue={resetForm ? "" : memberData ? memberData.email : formState?.email}
              isError={errors.email}
              inputTip={errors ? "" : "Make sure to add a working email address."}
              onChange={() => setErrors({ ...errors, email: null })}
            />

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <div className="flex items-center gap-2">Category*</div>
              </label>
              <div className="relative category-dropdown">
                {fetchedMemberCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setErrors({ ...errors, categoryID: null });
                    }}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 flex items-center justify-between border ${
                      errors.categoryID
                        ? "border-red-600 bg-red-700/10 placeholder-red-400/60 "
                        : "hover:border-gray-500 placeholder-gray-400 bg-gray-800/50 border border-gray-600"
                    }`}
                  >
                    <span className={selectedCategory ? "text-white" : "text-gray-400"}>
                      {selectedCategory
                        ? fetchedMemberCategories.find((cat) => cat._id === selectedCategory)?.name
                        : "Select a category"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {fetchedMemberCategories.length === 0 && (
                  <button
                    type="button"
                    onClick={onSelectionClick}
                    className="w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl text-left text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500 flex items-center justify-between"
                  >
                    <span className={selectedCategory ? "text-white" : "text-gray-400"}>
                      Please add a category first
                    </span>
                    <Plus
                      className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {/* Hidden input for form submission */}
                <input type="hidden" name="categoryID" value={selectedCategory} />

                {/* Dropdown Options */}
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-xl shadow-2xl z-10 max-h-40 overflow-y-auto">
                    <div className="py-1">
                      {/* Add new category button  */}
                      {onSelectionClick && (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectionClick();
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 text-left text-white hover:bg-gray-700/50 transition-all duration-200 flex items-center gap-3 `}
                        >
                          <div className={`w-3 h-3 rounded-full `}>
                            <Plus className="h-4 w-4" />{" "}
                          </div>
                          <span className="text-sm sm:text-base">Add New</span>
                        </button>
                      )}

                      {/* mapping all categories */}
                      {fetchedMemberCategories.map((category) => (
                        <button
                          key={category._id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category._id);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-white hover:bg-gray-700/50 transition-all duration-200 flex items-center gap-3 ${
                            selectedCategory === category.id ? "bg-blue-600/20 text-blue-300" : ""
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm sm:text-base">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <div className="flex items-center gap-2">Avatar Color*</div>
              </label>
              <div className="w-full flex justify-center bg-gray-700/50 rounded-lg sm:rounded-xl py-5">
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2 lg:gap-3 w-full">
                    {MEMBER_COLORS.map((color) => (
                      <label
                        key={color}
                        className={`relative cursor-pointer h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-lg sm:rounded-xl ${color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-gray-500 mx-auto`}
                        aria-label={`Select ${color.replace("bg-", "").replace("-500", "")} color`}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color}
                          className="sr-only peer"
                          defaultChecked={
                            memberData?.color === color ||
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
              </div>
              {errors.color && <p className="text-sm text-red-500 mt-1">{errors.color}</p>}
            </div>

            {Object.keys(errors).length > 0 && (
              <ul key={errors} className="text-sm text-red-500 mt-2 space-y-1 pl-4">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}

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
