import { Link } from "react-router-dom";

export default function MiniNavbar() {
  return (
    <nav className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-22 py-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-3">
          <div className="bg-blue-600 flex items-center justify-center rounded-lg w-10 h-10">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <span className="text-xl font-bold text-stone-800 dark:text-stone-200">
            Project Manager
          </span>
        </Link>
      </div>
    </nav>
  );
}
