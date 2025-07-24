export default function AddedMemeber({ member, onDelete, id }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-stone-100 dark:bg-stone-700 rounded-lg p-2 sm:p-3 w-full sm:w-auto">
      <div className="flex flex-row sm:flex-row items-center w-full sm:w-auto">
        <div
          className={
            member.color +
            " w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg"
          }
        >
          {member.name.charAt(0)}
        </div>

        <div className="ml-2 sm:ml-3 flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 truncate">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 truncate">
            {member.role}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(id)}
        className="mt-2 sm:mt-0 ml-auto sm:ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
        title="Remove member"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
