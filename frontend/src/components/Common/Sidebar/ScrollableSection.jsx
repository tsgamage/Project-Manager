import ProjectsDropdown from "./Dropdowns/ProjectsDropdown";
import TeamDropdown from "./Dropdowns/TeamDropDown";
import SidebarSection from "./SidebarSection";

export default function ScrollableSection({ items }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-6">
        <SidebarSection items={items} />
        <TeamDropdown />
        <ProjectsDropdown />
      </div>
    </div>
  );
}
