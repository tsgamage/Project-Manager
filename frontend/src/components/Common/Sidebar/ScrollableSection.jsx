import { CircleCheckBig, Home, Users } from "lucide-react";
import ProjectsDropdown from "./Dropdowns/ProjectsDropdown";
import SidebarSection from "./SidebarSection";

export default function ScrollableSection() {
  const topItems = [
    {
      name: "Home",
      icon: Home,
      path: "/home",
    },
    {
      name: "Tasks",
      icon: CircleCheckBig,
      path: "/project/tasks",
    },
    {
      name: "Teams",
      icon: Users,
      path: "/team/members",
    },
  ];
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-3">
        <SidebarSection items={topItems} />
        <ProjectsDropdown />
      </div>
    </div>
  );
}
