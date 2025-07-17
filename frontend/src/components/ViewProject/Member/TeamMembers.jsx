import AddMember from "./AddMember";
import Memeber from "./Member";

export default function TeamMembers({ team }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-header-light dark:text-header-dark">
          Team Members
        </h2>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {team.length} members
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <Memeber key={member._id} member={member} />
        ))}
        <AddMember />
      </div>
    </div>
  );
}
