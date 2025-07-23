import { useContext } from "react";
import ProjectContext from "../../../store/project.context";

export default function Memeber({ member }) {
  const { removeMember } = useContext(ProjectContext);

  return (
    <div className="flex items-center justify-between bg-white dark:bg-stone-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center">
        <div
          className={
            member.color +
            " w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          }
        >
          {member.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="font-medium text-stone-800 dark:text-stone-200">
            {member.name}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {member.role}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeMember(member._id)}
        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
        title="Remove member"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
