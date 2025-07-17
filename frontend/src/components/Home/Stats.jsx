export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
          Total Projects
        </h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</p>
      </div>
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
          In Progress
        </h3>
        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
          2
        </p>
      </div>
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
          Completed
        </h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          3
        </p>
      </div>
      <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-200 mb-2">
          Not Started
        </h3>
        <p className="text-3xl font-bold text-stone-600 dark:text-stone-400">
          4
        </p>
      </div>
    </div>
  );
}
