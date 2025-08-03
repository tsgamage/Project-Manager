import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ProjectContext from "../store/project.context.jsx";
import MemberContext from "../store/member.context.jsx";
import TeamHeader from "../components/Team/TeamHeader.jsx";
import TeamStats from "../components/Team/TeamStats.jsx";
import AddMemberModal from "../components/UI/Modals/AddMemberModal.jsx";
import AddMemberCategoryModal from "../components/UI/Modals/AddMemberCategoryModal.jsx";
import TopActionButtons from "../components/Team/TopActionButtons.jsx";
import GridMemberCard from "../components/Team/gridMemberCard.jsx";
import NoMember from "../components/Team/NoMember.jsx";
import ListMemberCard from "../components/Team/ListMemberCard.jsx";
import UpdateMemberCategoryModal from "../components/UI/Modals/UpdateMemberCategoryModal.jsx";
export default function TeamsPage() {
  const { projects } = useContext(ProjectContext);
  const { members, addMember, memberCategories, addMemberCategory } = useContext(MemberContext);

  const addMemberModal = useRef();
  const addMemberCategoryModal = useRef();
  const updateMemberCategoryModal = useRef();

  const [viewMode, setViewMode] = useState("grid");
  const [expandAll, setExpandAll] = useState(false);
  const [groupedMembers, setGroupedMembers] = useState({});
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    assignableMembers: 0,
    totalProjects: 0,
  });

  useEffect(() => {
    const stats = {
      totalMembers: members.length,
      activeMembers: members.filter((member) => member.assignedProjects.length > 0).length,
      assignableMembers: members.filter((member) => member.assignedProjects.length === 0).length,
      totalProjects: projects.length,
    };

    setTeamStats(stats);
  }, [projects, members]);

  function changeViewMode(mode) {
    setViewMode(mode);
  }

  function toggleExpandAll() {
    const newExpandAll = !expandAll;
    setExpandAll(newExpandAll);
  }

  const getMemberCategory = useCallback(
    (member) => {
      if (member.categoryID) {
        const category = memberCategories.filter((cat) => cat._id === member.categoryID);
        return category[0]._id;
      }
    },
    [memberCategories]
  );

  const groupMembersByCategory = useCallback(() => {
    const grouped = {};

    // Group members by category
    members.forEach((member) => {
      const category = getMemberCategory(member);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(member);
    });

    // Merge with all categories to include empty ones
    memberCategories.forEach((category) => {
      if (!grouped[category._id]) {
        grouped[category._id] = [];
      }
    });

    // Sort categories by member count (descending) and then alphabetically
    const sortedGrouped = {};
    Object.keys(grouped)
      .sort((a, b) => {
        if (grouped[b].length !== grouped[a].length) {
          return grouped[b].length - grouped[a].length;
        }
        return a.localeCompare(b);
      })
      .forEach((category) => {
        sortedGrouped[category] = grouped[category];
      });

    return sortedGrouped;
  }, [getMemberCategory, members, memberCategories]);

  useEffect(() => {
    if (memberCategories.length > 0) {
      setGroupedMembers(groupMembersByCategory());
    }
  }, [memberCategories, members, groupMembersByCategory]);

  return (
    <>
      <AddMemberModal
        ref={addMemberModal}
        onClose={() => addMemberModal.current.close()}
        onAddMember={addMember}
        onOpenAddCategoryModal={() => addMemberCategoryModal.current.open()}
      />
      <AddMemberCategoryModal
        ref={addMemberCategoryModal}
        onClose={() => addMemberCategoryModal.current.close()}
        onAddCategory={addMemberCategory}
      />
      <UpdateMemberCategoryModal
        ref={updateMemberCategoryModal}
        onClose={() => updateMemberCategoryModal.current.close()}
      />

      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto p-4 sm:p-6">
          <TeamHeader />
          <TeamStats teamStats={teamStats} />

          {/* Team Members Section */}
          <div className="gradient-card rounded-xl shadow-lg border border-gray-700 mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">Team Members</h2>

                <TopActionButtons
                  onAddMember={() => addMemberModal.current.open()}
                  onAddCategory={() => addMemberCategoryModal.current.open()}
                  viewMode={viewMode}
                  onViewModChange={changeViewMode}
                  groupedMembers={groupedMembers}
                  isExpanded={expandAll}
                  toggleExpandAll={toggleExpandAll}
                />
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {members.length === 0 && <NoMember onClick={() => addMemberModal.current.open()} />}

              {!(members.length === 0) && (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {members.map((member) => (
                        <GridMemberCard
                          key={member._id}
                          member={member}
                          category={
                            memberCategories.filter((cat) => cat._id === member.categoryID)[0]?.name
                          }
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-4">
                  {Object.entries(groupedMembers).map(([categoryID, categoryMembers]) => (
                    <ListMemberCard
                      key={categoryID}
                      categoryID={categoryID}
                      categoryMembers={categoryMembers}
                      groupedMembers={groupedMembers}
                      memberCategories={memberCategories}
                      memberModal={addMemberModal}
                      expandAll={expandAll}
                      onEditCategory={updateMemberCategoryModal.current.open}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
