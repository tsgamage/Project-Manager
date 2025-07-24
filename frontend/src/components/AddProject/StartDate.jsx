export default function StartDate({ defaultValue }) {
  return (
    <div>
      <label
        htmlFor="startDate"
        className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
      >
        Start Date*
      </label>
      <input
        id="startDate"
        type="date"
        name="startDate"
        className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
        defaultValue={defaultValue ? defaultValue : new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}
