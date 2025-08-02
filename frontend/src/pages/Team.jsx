import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context.jsx";
import { Users, UserPlus, MoreVertical, Grid3X3, List, Edit, Trash2, Mail, Calendar, Target, ChevronDown, ChevronRight, CheckCircle, Clock } from "lucide-react";
import MemberContext from "../store/member.context.jsx";
import { Tooltip } from "react-tooltip";

export default function TeamsPage() {
  const { projects } = useContext(ProjectContext);
  const { members } = useContext(MemberContext);
  const [viewMode, setViewMode] = useState("grid");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    assignableMembers: 0,
    totalProjects: 0,
  });

  useEffect(() => {
    const stats = {
      totalMembers: members.length,
      activeMembers: members.filter(member => member.assignedProjects.length > 0).length,
      assignableMembers: members.filter(member => member.assignedProjects.length === 0).length,
      totalProjects: projects.length,
    };

    setTeamStats(stats);
  }, [projects, members]);

  function getMemberPerformance(member) {
    if (member.totalTasks === 0) return 0;
    return Math.round((member.completedTasks / member.totalTasks) * 100);
  }

  function changeViewMode(mode) {
    setViewMode(mode);
  }

  function toggleCategory(category) {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }

  function toggleDropdown(memberId) {
    setOpenDropdown(openDropdown === memberId ? null : memberId);
  }

  function handleEditMember(member) {
    // TODO: Implement edit member functionality
    console.log("Edit member:", member);
    setOpenDropdown(null);
  }

  function handleDeleteMember(member) {
    // TODO: Implement delete member functionality
    console.log("Delete member:", member);
    setOpenDropdown(null);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getMemberCategory(member) {
    // For now, categorize by assignment status
    // In the future, this can be based on member.category field
    if (member.assignedProjects.length === 0) {
      return "Available Members";
    } else if (member.assignedProjects.length <= 2) {
      return "Lightly Assigned";
    } else {
      return "Heavily Assigned";
    }
  }

  function groupMembersByCategory() {
    const grouped = {};
    members.forEach(member => {
      const category = getMemberCategory(member);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(member);
    });
    return grouped;
  }

  const groupedMembers = groupMembersByCategory();

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Team Management
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400">
            Manage your team members and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                  Total Members
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                  {teamStats.totalMembers}
                </p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                  Active Members
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">
                  {teamStats.activeMembers}
                </p>
              </div>
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                  Available
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {teamStats.assignableMembers}
                </p>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                  Total Projects
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  {teamStats.totalProjects}
                </p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="gradient-card rounded-xl shadow-lg border border-gray-700 mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">
                Team Members
              </h2>
              
              <div className="flex items-center gap-3">
                {/* View Toggle Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeViewMode("grid")}
                    className={`_grid-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <Tooltip anchorSelect="._grid-view">Grid View</Tooltip>

                  <button
                    onClick={() => changeViewMode("list")}
                    className={`_list-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
                    }`}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <Tooltip anchorSelect="._list-view">List View</Tooltip>
                </div>

                {/* Add Member Button */}
                <button className="gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover-lift">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Member</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {members.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 gradient-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No team members found
                </h3>
                <p className="text-gray-400 mb-6">
                  Add your first team member to get started
                </p>
                <button className="gradient-blue hover:shadow-lg text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover-lift mx-auto">
                  <UserPlus className="h-4 w-4" />
                  Add First Member
                </button>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {members.map((member) => (
                      <div key={member._id} className="gradient-card rounded-xl p-4 sm:p-6 hover-lift transition-all duration-300 border border-gray-700">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-sm sm:text-base">
                                {member.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-400">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          
                          {/* Assignment Badge */}
                          <div className="flex items-center gap-2">
                            {member.assignedProjects.length === 0 ? (
                              <span className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Free
                              </span>
                            ) : (
                              <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-full flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Assigned
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Member Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-400">Email:</span>
                            <span className="font-medium text-white truncate ml-2">
                              {member.email}
                            </span>
                          </div>

                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-400">Projects:</span>
                            <span className="font-medium text-white">
                              {member.assignedProjects.length}
                            </span>
                          </div>

                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-400">Performance:</span>
                            <span className="font-medium text-white">
                              {getMemberPerformance(member)}%
                            </span>
                          </div>
                        </div>

                                                  {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button 
                              className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-xs sm:text-sm"
                              title="Send Email"
                            >
                              <Mail className="h-3 w-3" />
                              <span className="hidden sm:inline">Email</span>
                            </button>
                            <div className="relative dropdown-container">
                              <button 
                                onClick={() => toggleDropdown(member._id)}
                                className="bg-gray-700/50 hover:bg-gray-700/70 text-gray-400 p-2 rounded-lg transition-all duration-200"
                                title="More Options"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              
                              {/* Dropdown Menu */}
                              {openDropdown === member._id && (
                                <div className="absolute right-0 top-full mt-1 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                  <button
                                    onClick={() => handleEditMember(member)}
                                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                  >
                                    <Edit className="h-3 w-3" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMember(member)}
                                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === "list" && (
                  <div className="space-y-4">
                    {Object.entries(groupedMembers).map(([category, categoryMembers]) => (
                      <div key={category} className="border border-gray-700 rounded-xl overflow-hidden">
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white">
                              {category}
                            </span>
                            <span className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded-full">
                              {categoryMembers.length}
                            </span>
                          </div>
                          {expandedCategories[category] ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </button>

                        {/* Category Members */}
                        {expandedCategories[category] && (
                          <div className="space-y-1 p-2">
                            {categoryMembers.map((member) => (
                              <div key={member._id} className="gradient-card rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                                <div className="flex items-center justify-between">
                                  {/* Left Section - Member Info */}
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`${member.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0`}>
                                      {member.name.charAt(0)}
                                    </div>
                                    
                                                                         <div className="flex-1 min-w-0">
                                       <div className="flex items-center gap-2 mb-1">
                                         <h3 className="font-semibold text-white text-sm truncate flex-1">
                                           {member.name}
                                         </h3>
                                         <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full flex-shrink-0">
                                           {member.role}
                                         </span>
                                       </div>
                                       
                                       <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
                                         <div className="flex items-center gap-1 min-w-0">
                                           <Mail className="h-3 w-3 flex-shrink-0" />
                                           <span className="truncate">{member.email}</span>
                                         </div>
                                         
                                         <div className="flex items-center gap-1 flex-shrink-0">
                                           <Target className="h-3 w-3" />
                                           <span>{member.assignedProjects.length} projects</span>
                                         </div>
                                         
                                         <div className="flex items-center gap-1 flex-shrink-0">
                                           <span className={getMemberPerformance(member) >= 70 ? "text-green-400" : getMemberPerformance(member) >= 40 ? "text-yellow-400" : "text-red-400"}>
                                             {getMemberPerformance(member)}%
                                           </span>
                                         </div>
                                       </div>
                                     </div>
                                  </div>

                                  {/* Right Section - Actions */}
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <button className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors" title="Send Email">
                                      <Mail className="h-3 w-3 text-gray-400 hover:text-blue-300" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors" title="Edit">
                                      <Edit className="h-3 w-3 text-gray-400 hover:text-blue-300" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors" title="Delete">
                                      <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-300" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 