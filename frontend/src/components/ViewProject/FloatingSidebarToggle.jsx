import { useContext } from "react";
import PageLayoutContext from "../../store/pageLayout.context";
import { Menu, X } from "lucide-react";

export default function FloatingSidebarToggle() {
  const { toggleProjectSidebar, isProjectSidebarOpen } = useContext(PageLayoutContext);
  return (
    <button
      onClick={toggleProjectSidebar}
      className="lg:hidden fixed bottom-6 right-6 z-[60] bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
    >
      {isProjectSidebarOpen ? <X /> : <Menu />}
    </button>
  );
}
