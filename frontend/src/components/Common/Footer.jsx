import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
                Project Manager
              </h3>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-blue-600 dark:text-stone-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a
              href="https://github.com/tsgamage/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-green-500 dark:text-stone-400 dark:hover:text-green-400 transition-colors"
              aria-label="Linktree"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.736 5.636a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 0 1 0-1.414zM10.264 5.636a1 1 0 0 0-1.414 0l-5.657 5.657a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 md:mb-0">
            © {new Date().getFullYear()} Princess Software Solutions. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <Link
              to="/privacy"
              className="text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
