import { useCallback, useEffect, useRef, useState } from "react";
import TeamHeader from "../components/Team/TeamHeader.jsx";
import TeamStats from "../components/Team/TeamStats.jsx";
import TopActionButtons from "../components/Team/TopActionButtons.jsx";
import GridMemberCard from "../components/Team/GridMemberCard.jsx";
import NoMember from "../components/Team/NoMember.jsx";
import ListMemberCard from "../components/Team/ListMemberCard.jsx";
import MemberModal from "../components/UI/Modals/MemberModal.jsx";
import MemberCategoryModal from "../components/UI/Modals/MemberCategoryModal.jsx";
import { useSelector } from "react-redux";

export default function TeamsPage() {
  const projects = useSelector((state) => state.project.projects);
  const fetchedMembers = useSelector((state) => state.team.members);
  const fetchedMemberCategories = useSelector((state) => state.team.memberCategories);
  const isFetchingMembers = useSelector((state) => state.team.isLoading);

  const memberModal = useRef();
  const addMemberCategoryModal = useRef();

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
      totalMembers: fetchedMembers.length,
      activeMembers: fetchedMembers.filter((member) => member.assignedProjects.length > 0).length,
      assignableMembers: fetchedMembers.filter((member) => member.assignedProjects.length === 0).length,
      totalProjects: projects.length,
    };
    setTeamStats(stats);
  }, [projects, fetchedMembers]);

  function changeViewMode(mode) {
    setViewMode(mode);
  }

  function toggleExpandAll() {
    setExpandAll((preValue) => !preValue);
  }

  const getMemberCategory = useCallback(
    (member) => {
      if (member.categoryID) {
        const category = fetchedMemberCategories.filter((cat) => cat._id === member.categoryID);
        return category[0]?._id;
      }
    },
    [fetchedMemberCategories]
  );

  useEffect(() => {
    const grouped = {};

    // Group members by category
    fetchedMembers.forEach((member) => {
      const category = getMemberCategory(member);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(member);
    });

    // Merge with all categories to include empty ones
    fetchedMemberCategories.forEach((category) => {
      if (!grouped[category._id]) {
        grouped[category._id] = [];
      }
    });

    // Sort categories by member count (descending)
    const sortedGrouped = {};
    Object.keys(grouped)
      .sort((a, b) => grouped[b].length - grouped[a].length)
      .forEach((category) => {
        sortedGrouped[category] = grouped[category];
      });

    setGroupedMembers(sortedGrouped);
  }, [fetchedMemberCategories, fetchedMembers, getMemberCategory]);

  return (
    <>
      <MemberModal ref={memberModal} onSelectionClick={() => addMemberCategoryModal.current.open()} />
      <MemberCategoryModal ref={addMemberCategoryModal} />

      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto p-2 sm:p-6">
          <TeamHeader />
          <TeamStats teamStats={teamStats} isLoading={isFetchingMembers} />

          {/* Team Members Section */}
          <div className="gradient-card rounded-xl shadow-lg border border-gray-700 mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">Team Members</h2>

                <TopActionButtons
                  onAddMember={() => memberModal.current.open()}
                  onAddCategory={() => addMemberCategoryModal.current.open()}
                  viewMode={viewMode}
                  onViewModChange={changeViewMode}
                  groupedMembers={groupedMembers}
                  isExpanded={expandAll}
                  toggleExpandAll={toggleExpandAll}
                  isLoading={isFetchingMembers}
                />
              </div>
            </div>

            <div className="p-2 py-6 sm:p-6">
              {isFetchingMembers && (
                <div className="p-10 space-y-4 flex items-center justify-center">
                  <span class="loading loading-bars loading-md"></span>
                </div>
              )}
              {!isFetchingMembers && fetchedMembers.length === 0 && (
                <NoMember onClick={() => memberModal.current.open()} />
              )}

              {!isFetchingMembers && fetchedMembers.length > 0 && (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                      {fetchedMembers.map((member) => (
                        <GridMemberCard
                          key={member._id}
                          member={member}
                          category={fetchedMemberCategories.filter((cat) => cat._id === member.categoryID)[0]?.name}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-2">
                  {Object.entries(groupedMembers).map(([categoryID, categoryMembers]) => (
                    <ListMemberCard
                      key={categoryID}
                      categoryID={categoryID}
                      categoryMembers={categoryMembers}
                      groupedMembers={groupedMembers}
                      memberCategories={fetchedMemberCategories}
                      memberModal={memberModal}
                      expandAll={expandAll}
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
