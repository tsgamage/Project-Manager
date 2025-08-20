import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
  useActionState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { X, Check, Loader, ChevronDown, Plus } from "lucide-react";
import ModalInput from "./components/ModalInput.jsx";
import colors from "../../../util/colors.js";
import { useDispatch, useSelector } from "react-redux";
import { createNewMemberThunk, updateMemberThunk } from "../../../store/member.action.js";

export default forwardRef(function AddMemberModal({ onSelectionClick, memberData }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(memberData ? memberData.categoryID : "");
  const [errors, setErrors] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const [formState, formAction, pending] = useActionState(AddMemberAction);

  const fetchedMemberCategories = useSelector((state) => state.team.memberCategories);
  const dispatch = useDispatch();
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
      response = await dispatch(updateMemberThunk(memberData._id, memberObj));
    } else {
      response = await dispatch(createNewMemberThunk(memberObj));
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
      <div className="w-full max-w-sm sm:max-w-md mx-auto max-h-[90dvh] overflow-y-auto">
        <div className="glass rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header - More compact on mobile */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {memberData ? "Edit Member" : "Add Member"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-300"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form key={resetForm} action={formAction} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Name and Role - Stack on mobile, side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ModalInput
                id="name"
                label="Name*"
                placeholder="Member name"
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

            {/* Email - Full width */}
            <ModalInput
              id="email"
              label="Email*"
              placeholder="member@example.com"
              defaultValue={resetForm ? "" : memberData ? memberData.email : formState?.email}
              isError={errors.email}
              inputTip={errors ? "" : "Use a working email address"}
              onChange={() => setErrors({ ...errors, email: null })}
            />

            {/* Category Selection - Improved mobile dropdown */}
            <div className="relative category-dropdown">
              <label className="block text-sm font-medium text-white mb-2">Category*</label>

              {fetchedMemberCategories.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setErrors({ ...errors, categoryID: null });
                    }}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-white focus:outline-none transition-all duration-300 flex items-center justify-between border ${
                      errors.categoryID
                        ? "border-red-600 bg-red-700/10"
                        : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                    }`}
                  >
                    <span className={selectedCategory ? "" : "text-gray-400"}>
                      {selectedCategory
                        ? fetchedMemberCategories.find((cat) => cat._id === selectedCategory)?.name
                        : "Select category"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <input type="hidden" name="categoryID" value={selectedCategory} />

                  {isCategoryOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div className="py-1">
                        {onSelectionClick && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectionClick();
                              setIsCategoryOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-white hover:bg-gray-700/50 flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add New</span>
                          </button>
                        )}
                        {fetchedMemberCategories.map((category) => (
                          <button
                            key={category._id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(category._id);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-white hover:bg-gray-700/50 flex items-center gap-2 ${
                              selectedCategory === category._id ? "bg-blue-600/20" : ""
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full ${category.color}`} />
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={onSelectionClick}
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white hover:border-gray-500 flex items-center justify-between"
                >
                  <span className="text-gray-400">Add a category first</span>
                  <Plus className="h-4 w-4 text-gray-400" />
                </button>
              )}
              {errors.categoryID && (
                <p className="mt-1 text-sm text-red-500">{errors.categoryID}</p>
              )}
            </div>

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
                        memberData?.color === color ||
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

            {/* Error messages */}
            {Object.keys(errors).length > 0 && (
              <div className="text-sm text-red-500 space-y-1">
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {/* Action Buttons - Better mobile spacing */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
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
                  pending ? "opacity-50 cursor-not-allowed" : ""
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
