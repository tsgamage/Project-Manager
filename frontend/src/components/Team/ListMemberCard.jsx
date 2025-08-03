import {
  ChevronDown,
  ChevronRight,
  Edit,
  Mail,
  MoreVertical,
  Target,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import MemberContext from "../../store/member.context";
import { toast } from "react-hot-toast";
import DeleteWarningModal from "../UI/Modals/DeleteWarningModal";
import UpdateMemberModal from "../UI/Modals/UpdateMemberModal";

export default function ListMemberCard({
  categoryID,
  categoryMembers,
  groupedMembers,
  expandAll,
  memberCategories,
  onEditCategory,
  memberModal,
}) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(null);

  const deleteModal = useRef();
  const updateMemberModal = useRef();
  const { deleteCategory, deleteMember } = useContext(MemberContext);

  function handleEditCategory() {
    onEditCategory(categoryID);
    setOpenCategoryDropdown(null);
  }

  async function handleDeleteCategory() {
    // TODO: Implement delete category functionality
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
      setExpandedCategories(allExpanded);
    } else {
      // Collapse all categories
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

  return (
    <>
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
                    onClick={() => handleDeleteCategory(categoryID)}
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
            {categoryMembers.length === 0 ? (
              <div className="text-center py-4 sm:py-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-card rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mb-2">No members in this category</p>
                <button
                  onClick={() => memberModal.current.open(categoryID)}
                  className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 mx-auto"
                >
                  <UserPlus className="h-3 w-3" />
                  Add Member
                </button>
              </div>
            ) : (
              categoryMembers.map((member) => (
                <>
                  <DeleteWarningModal
                    ref={deleteModal}
                    message={`Are you sure you want to delete member ${member.name}? This action cannot be undone.`}
                    onCancel={() => deleteModal.current.close()}
                    onConfirm={async () => {
                      deleteModal.current.close();
                      await deleteMember(member._id);
                      toast.success("Member deleted successfully");
                    }}
                  />
                  <UpdateMemberModal
                    ref={updateMemberModal}
                    member={member}
                    onOpenAddCategoryModal={() => memberModal.current.open()}
                  />
                  <div
                    key={member._id}
                    className="gradient-card rounded-lg p-2.5 sm:p-4 pl-4 sm:pl-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    {/* Color Gradient Indicator */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${member.color} opacity-80`}
                    ></div>
                    <div className="flex items-center justify-between">
                      {/* Left Section - Member Info */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 sm:mb-2">
                            <h3 className="font-semibold text-white text-sm sm:text-base lg:text-lg truncate">
                              {member.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                              {member.role}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm text-gray-400">
                            <div className="flex items-center gap-1 min-w-0">
                              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>
                                {member.assignedProjects.length}{" "}
                                {member.assignedProjects.length === 1 ? "project" : "projects"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Right Section - Actions */}
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 flex-shrink-0">
                        <a
                          href={`mailto:${member.email}?subject=${`Project Manager: <your subject here>`}&body=${`Hello ${member.name},\n\n I hope this email finds you well`},`}
                          className="p-2.5 sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-blue-300" />
                        </a>
                        <button
                          onClick={() => updateMemberModal.current.open(member.categoryID)}
                          className="p-2.5 sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-blue-300" />
                        </button>
                        <button
                          onClick={() => deleteModal.current.open()}
                          className="p-2.5 cursor-pointer sm:p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 sm:h-4 sm:w-4 text-gray-400 hover:text-red-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
