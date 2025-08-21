import { Info, Target, Users } from "lucide-react";
import { useSelector } from "react-redux";

export default function NavigationTabs({ onNavigationClick, activeTab }) {
  const selectedProject = useSelector((state) => state.project.selectedProject);

  const totalTasks = selectedProject.tasks.length;
  const teamSize = selectedProject.team.length;

  const tabs = [
    { id: "tasks", label: "Tasks", icon: Target, count: totalTasks },
    { id: "team", label: "Team", icon: Users, count: teamSize },
    { id: "info", label: "Project Info", icon: Info },
  ];

  return (
    <div className="px-2 sm:px-6 lg:px-8 mb-8">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigationClick(tab.id)}
            className={`flex cursor-pointer items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl font-medium hover-lift text-sm sm:text-base ${
              activeTab === tab.id
                ? "gradient-blue text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="bg-gray-800/50 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
