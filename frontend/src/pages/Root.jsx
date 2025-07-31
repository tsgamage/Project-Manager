import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";

export default function RootLayout() {
  return (
    <div className="h-screen bg-theme-light dark:bg-theme-dark overflow-hidden flex flex-col">
      <Navbar />
      {/* Main Layout */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
