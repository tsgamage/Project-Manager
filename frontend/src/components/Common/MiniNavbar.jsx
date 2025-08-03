import { Link } from "react-router-dom";

export default function MiniNavbar() {
  return (
    <nav className="backdrop-blur-xl bg-black/40 border-b border-gray-800/50 px-4 py-2 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-xs">PM</span>
          </div>
          <span className="text-sm font-bold transition-all duration-300 group-hover:text-blue-300 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Project Manager
          </span>
        </Link>
      </div>
    </nav>
  );
}
