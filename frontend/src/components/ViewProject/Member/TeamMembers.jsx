import { useContext, useRef } from "react";
import AddMember from "./AddMember";
import Memeber from "./Member";
import ProjectContext from "../../../store/project.context";
import { Users } from "lucide-react";
import AddMemberToProject from "../../UI/Modals/AddMemberToProject";
import MemberContext from "../../../store/member.context";

export default function TeamMembers({ team }) {
  const { selectedProject } = useContext(ProjectContext);
  const { fetchedMembers } = useContext(MemberContext);
  const modal = useRef();

  // Calculate team statistics

  return (
    <>
      <AddMemberToProject
        ref={modal}
        onAddMembers={() => {
          console.log("Hellow");
        }}
        projectId={selectedProject._id}
      />

      <div className="glass rounded-2xl shadow-lg border border-gray-700 p-2 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Team Members
            </h2>
            <p className="text-sm text-gray-400">Manage your project team</p>
          </div>

          <span className="text-sm text-gray-400">{team.length} members assigned</span>
        </div>

        <div className="mb-8">
          {/* Members Grid */}
          <div>
            <div className="flex items-center justify-between mb-5 mt-5">
              <h3 className="text-lg font-semibold text-white">Team Members</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {team.length === 0 ? (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">No team members assigned</p>
                  <p className="text-sm text-gray-500">Add team members to start collaborating</p>
                </div>
              ) : (
                team.map((memberID) => {
                  const memberObj = fetchedMembers.find((m) => m._id === memberID);
                  return <Memeber key={memberID} member={memberObj} />;
                })
              )}
              <AddMember onAdd={() => modal.current.open()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
