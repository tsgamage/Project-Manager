import { useContext, useRef } from "react";
import AddMember from "./AddMember";
import Memeber from "./Member";
import AddMemberModal from "../../UI/Modals/AddMemberModal";
import ProjectContext from "../../../store/project.context";
import { Users, UserPlus, Award, Activity, Mail, Calendar, TrendingUp } from "lucide-react";

export default function TeamMembers({ team }) {
  const { addMember } = useContext(ProjectContext);
  const modal = useRef();

  // Calculate team statistics
  const totalMembers = team.length;
  const activeMembers = team.filter(member => member.status !== 'inactive').length;
  const roles = [...new Set(team.map(member => member.role))];
  const activePercentage = totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;

  return (
    <>
      <AddMemberModal
        ref={modal}
        onClose={() => modal.current.close()}
        onAddMember={(member) => addMember(member)}
      />
      
      <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Team Members
            </h2>
            <p className="text-sm text-gray-400">
              Manage your project team and track member activity
            </p>
          </div>

          <button
            onClick={() => modal.current.open()}
            className="flex items-center gap-2 gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl transition-all duration-300 hover-lift w-full sm:w-auto justify-center"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Team Statistics - Visual Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Members Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1">{totalMembers}</h3>
                <p className="text-sm text-blue-300">Total Members</p>
              </div>
            </div>

            {/* Active Members Card */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-400 font-medium">{activePercentage}%</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1">{activeMembers}</h3>
                <p className="text-sm text-green-300">Active Members</p>
              </div>
            </div>

            {/* Roles Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-sm text-purple-400 font-medium">Roles</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1">{roles.length}</h3>
                <p className="text-sm text-purple-300">Different Roles</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-4 bg-gray-700/50 rounded-xl p-4 border border-gray-600">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Team Activity:</span>
                <span className="text-white font-medium">{activeMembers}/{totalMembers} active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">{activePercentage}% active rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Team Members</h3>
            <span className="text-sm text-gray-400">{totalMembers} members</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {team.length === 0 ? (
              <div className="col-span-full text-center py-8 sm:py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No team members assigned</p>
                <p className="text-sm text-gray-500">Add team members to start collaborating</p>
              </div>
            ) : (
              team.map((member) => (
                <Memeber key={member._id} member={member} />
              ))
            )}
            <AddMember onAdd={() => modal.current.open()} />
          </div>
        </div>
      </div>
    </>
  );
}
