import { useContext, useEffect, useState } from "react";
import ProjectContext from "../store/project.context.jsx";
import { Users, UserPlus, Calendar, Target, Award, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function TeamsPage() {
  const { projects } = useContext(ProjectContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    overdueProjects: 0,
  });

  useEffect(() => {
    const allMembers = new Map();
    
    projects.forEach(project => {
      project.team.forEach(member => {
        if (!allMembers.has(member._id)) {
          allMembers.set(member._id, {
            ...member,
            assignedProjects: [],
            completedTasks: 0,
            totalTasks: 0,
          });
        }
        
        const memberData = allMembers.get(member._id);
        memberData.assignedProjects.push({
          id: project._id,
          title: project.title,
          status: getProjectStatus(project),
        });
        
        const projectTasks = project.tasks || [];
        memberData.totalTasks += projectTasks.length;
        memberData.completedTasks += projectTasks.filter(task => task.completed).length;
      });
    });
    
    setTeamMembers(Array.from(allMembers.values()));
  }, [projects]);

  useEffect(() => {
    const stats = {
      totalMembers: teamMembers.length,
      activeMembers: teamMembers.filter(member => member.assignedProjects.length > 0).length,
      totalProjects: projects.length,
      completedProjects: projects.filter(project => 
        project.tasks.length > 0 && project.tasks.every(task => task.completed)
      ).length,
      inProgressProjects: projects.filter(project => {
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(task => task.completed).length;
        return completedTasks > 0 && completedTasks < totalTasks;
      }).length,
      overdueProjects: projects.filter(project => {
        if (!project.endDate) return false;
        return new Date(project.endDate) < new Date() && 
               !(project.tasks.length > 0 && project.tasks.every(task => task.completed));
      }).length,
    };
    
    setTeamStats(stats);
  }, [teamMembers, projects]);

  function getProjectStatus(project) {
    if (project.tasks.length === 0) return "Not Started";
    if (project.tasks.every(task => task.completed)) return "Completed";
    
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.completed).length;
    
    if (completedTasks === 0) return "Not Started";
    if (completedTasks < totalTasks) return "In Progress";
    return "Completed";
  }

  function getStatusColor(status) {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Not Started":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  }

  function getMemberPerformance(member) {
    if (member.totalTasks === 0) return 0;
    return Math.round((member.completedTasks / member.totalTasks) * 100);
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Team Management
              </h1>
              <div className="w-16 h-1 gradient-blue rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400">
            Manage your team members, track performance, and monitor project assignments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Total Members
                </h3>
                <p className="text-3xl font-bold text-blue-400">
                  {teamStats.totalMembers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Active Members
                </h3>
                <p className="text-3xl font-bold text-green-400">
                  {teamStats.activeMembers}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {teamStats.totalProjects}
                </p>
              </div>
              <Target className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Completed
                </h3>
                <p className="text-3xl font-bold text-purple-400">
                  {teamStats.completedProjects}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                In Progress
              </h3>
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-400">
              {teamStats.inProgressProjects}
            </p>
          </div>

          <div className="glass rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Completed
              </h3>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">
              {teamStats.completedProjects}
            </p>
          </div>

          <div className="glass rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Overdue
              </h3>
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-400">
              {teamStats.overdueProjects}
            </p>
          </div>
        </div>

        <div className="glass rounded-xl shadow-lg border border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Team Members
              </h2>
              <button className="gradient-blue hover:shadow-lg text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover-lift">
                <UserPlus className="h-4 w-4" />
                Add Member
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {teamMembers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-gray-400">No team members found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member._id} className="gradient-card rounded-xl p-6 hover-lift transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Assigned Projects:</span>
                        <span className="font-medium text-white">
                          {member.assignedProjects.length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Tasks Completed:</span>
                        <span className="font-medium text-white">
                          {member.completedTasks}/{member.totalTasks}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Performance:</span>
                        <span className="font-medium text-white">
                          {getMemberPerformance(member)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="gradient-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getMemberPerformance(member)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {member.assignedProjects.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Assigned Projects:
                        </h4>
                        <div className="space-y-2">
                          {member.assignedProjects.slice(0, 3).map((project) => (
                            <div key={project.id} className="flex items-center justify-between text-xs">
                              <span className="text-gray-400 truncate">
                                {project.title}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </div>
                          ))}
                          {member.assignedProjects.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{member.assignedProjects.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-xl shadow-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project._id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.team.length} team members • {project.tasks.length} tasks
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(getProjectStatus(project))}`}>
                    {getProjectStatus(project)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 