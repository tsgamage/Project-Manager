export default function AddMember({ onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="flex items-center justify-center bg-white dark:bg-stone-800 rounded-lg p-4 shadow-sm border-2 border-dashed border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
    >
      <div className="bg-stone-100 dark:bg-stone-700 w-12 h-12 rounded-full flex items-center justify-center text-stone-400">
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="font-medium text-stone-800 dark:text-stone-200">
          Add Member
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Click to add new team member
        </p>
      </div>
    </button>
  );
}
