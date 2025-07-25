export default function FloatingSidebarToggle({ onToggle, sideBarState }) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden fixed bottom-6 right-6 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
    >
      {!sideBarState && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
      {sideBarState && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 6l12 12M6 18L18 6"
          />
        </svg>
      )}
    </button>
  );
}
