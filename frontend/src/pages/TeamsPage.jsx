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
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      case "In Progress":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400";
      case "Not Started":
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
      default:
        return "text-stone-600 bg-stone-100 dark:bg-stone-700 dark:text-stone-400";
    }
  }

  function getMemberPerformance(member) {
    if (member.totalTasks === 0) return 0;
    return Math.round((member.completedTasks / member.totalTasks) * 100);
  }

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-2">
              Team Management
            </h1>
          </div>
          <p className="text-stone-600 dark:text-stone-400">
            Manage your team members, track performance, and monitor project assignments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
                  Total Members
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {teamStats.totalMembers}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
                  Active Members
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {teamStats.activeMembers}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {teamStats.totalProjects}
                </p>
              </div>
              <Target className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
                  Completed
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {teamStats.completedProjects}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200">
                In Progress
              </h3>
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {teamStats.inProgressProjects}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200">
                Completed
              </h3>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {teamStats.completedProjects}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200">
                Overdue
              </h3>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {teamStats.overdueProjects}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md mb-8">
          <div className="p-6 border-b border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
                Team Members
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <UserPlus className="h-4 w-4" />
                Add Member
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {teamMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                <p className="text-stone-600 dark:text-stone-400">No team members found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member._id} className="bg-stone-50 dark:bg-stone-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold`}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-stone-800 dark:text-stone-200">
                          {member.name}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600 dark:text-stone-400">Assigned Projects:</span>
                        <span className="font-medium text-stone-800 dark:text-stone-200">
                          {member.assignedProjects.length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600 dark:text-stone-400">Tasks Completed:</span>
                        <span className="font-medium text-stone-800 dark:text-stone-200">
                          {member.completedTasks}/{member.totalTasks}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-600 dark:text-stone-400">Performance:</span>
                        <span className="font-medium text-stone-800 dark:text-stone-200">
                          {getMemberPerformance(member)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-stone-200 dark:bg-stone-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getMemberPerformance(member)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {member.assignedProjects.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                          Assigned Projects:
                        </h4>
                        <div className="space-y-2">
                          {member.assignedProjects.slice(0, 3).map((project) => (
                            <div key={project.id} className="flex items-center justify-between text-xs">
                              <span className="text-stone-600 dark:text-stone-400 truncate">
                                {project.title}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </div>
                          ))}
                          {member.assignedProjects.length > 3 && (
                            <p className="text-xs text-stone-500 dark:text-stone-400">
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

        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md">
          <div className="p-6 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project._id} className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-stone-800 dark:text-stone-200">
                        {project.title}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {project.team.length} team members • {project.tasks.length} tasks
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getProjectStatus(project))}`}>
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