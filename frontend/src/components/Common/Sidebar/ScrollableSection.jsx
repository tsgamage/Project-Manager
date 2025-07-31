import { CircleCheckBig, Home } from "lucide-react";
import ProjectsDropdown from "./Dropdowns/ProjectsDropdown";
import TeamDropdown from "./Dropdowns/TeamDropDown";
import SidebarSection from "./SidebarSection";

export default function ScrollableSection() {
  const topItems = [
    {
      name: "Home",
      icon: Home,
      path: "/home",
    }, {
      name: "Tasks",
      icon: CircleCheckBig,
      path: "/project/tasks"
    },
  ];
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        <SidebarSection items={topItems} />
        <TeamDropdown />
        <ProjectsDropdown />
      </div>
    </div>
  );
}
