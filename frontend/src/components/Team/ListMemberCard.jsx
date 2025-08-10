import { ChevronDown, ChevronRight, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import MemberContext from "../../store/member.context";
import { toast } from "react-hot-toast";
import MemberCategoryModal from "../UI/Modals/MemberCategoryModal";
import NoMemberCard from "./ListMemberCard/NoMemberCard";
import MemberCard from "./ListMemberCard/MemberCard";

let EXPANDED_CATEGORIES = {};

export default function ListMemberCard({
  categoryID,
  categoryMembers,
  groupedMembers,
  expandAll,
  memberCategories,
  memberModal,
}) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(null);

  const updateMemberCategoryModal = useRef();

  const { deleteCategory, updateMemberCategory } = useContext(MemberContext);

  function handleEditCategory() {
    //? This is the function that calls when user clicks on the edit category button
    updateMemberCategoryModal.current.open();
    setOpenCategoryDropdown(null);
  }

  async function handleDeleteCategory() {
    const response = await deleteCategory(categoryID);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setOpenCategoryDropdown(null);
  }

  function toggleCategory(category) {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  useEffect(() => {
    if (expandAll) {
      // Expand all categories
      const allExpanded = {};
      Object.keys(groupedMembers).forEach((category) => {
        allExpanded[category] = true;
      });
      EXPANDED_CATEGORIES = allExpanded;
      setExpandedCategories(allExpanded);
    } else {
      // Collapse all categories
      EXPANDED_CATEGORIES = {};
      setExpandedCategories({});
    }
  }, [expandAll, groupedMembers]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".category-dropdown-container")) {
        setOpenCategoryDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getNameByCategoryID() {
    const category = memberCategories.filter((cat) => cat._id === categoryID);
    return category[0]?.name;
  }

  function getColorByCategoryID() {
    const color = memberCategories.filter((cat) => cat._id === categoryID);
    return color[0]?.color;
  }

  function toggleCategoryDropdown(category) {
    setOpenCategoryDropdown(openCategoryDropdown === category ? null : category);
  }

  const categoryData = memberCategories.filter((cat) => cat._id === categoryID)[0];

  return (
    <>
      <MemberCategoryModal
        ref={updateMemberCategoryModal}
        categoryData={categoryData}
        onClick={updateMemberCategory}
      />

      <div className="border border-gray-700 rounded-xl relative">
        {/* Category Header */}
        <div className="w-full p-3 sm:p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 flex items-center justify-between">
          <button
            onClick={() => toggleCategory(categoryID)}
            className="cursor-pointer flex items-center gap-2 sm:gap-3 flex-1"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`${getColorByCategoryID()} } w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0`}
              ></div>
              <span className="text-sm font-semibold text-white truncate">
                {getNameByCategoryID()}
              </span>
            </div>
            <span className="text-xs bg-gray-600/50 text-gray-300 px-1.5 sm:px-2 py-1 rounded-full flex-shrink-0">
              {categoryMembers.length} {categoryMembers.length === 1 ? "member" : "members"}
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className="cursor-pointer flex select-none items-center justify-center"
              onClick={() => toggleCategory(categoryID)}
            >
              <span className="text-xs text-gray-400 hidden sm:inline ">
                {expandedCategories[categoryID] ? "Collapse" : "Expand"}
              </span>
              {expandedCategories[categoryID] ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>

            {/* Category Actions Dropdown */}
            <div className="relative category-dropdown-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryDropdown(categoryID);
                }}
                className="p-2 sm:p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors"
                title="Category Options"
              >
                <MoreVertical className="h-4 w-4 text-gray-400 hover:text-gray-300" />
              </button>

              {/* Category Dropdown Menu */}
              {openCategoryDropdown === categoryID && (
                <div className="absolute right-0 top-full mt-1 w-36 sm:w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleEditCategory}
                    className="w-full px-3 py-2.5 sm:py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteCategory}
                    className="w-full px-3 py-2.5 sm:py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Members */}
        {expandedCategories[categoryID] && (
          <div className="space-y-1 p-2 sm:p-2">
            {categoryMembers.length === 0 && <NoMemberCard modal={memberModal} />}
            {categoryMembers.length !== 0 &&
              categoryMembers.map((member) => (
                <MemberCard key={member._id} member={{ ...member, categoryID }} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
