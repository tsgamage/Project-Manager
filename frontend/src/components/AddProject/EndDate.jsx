export default function EndDate({ defaultValue }) {
  return (
    <div>
      <label
        htmlFor="endDate"
        className="block text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300 mb-1 sm:mb-2"
      >
        End Date*
      </label>
      <input
        id="endDate"
        type="date"
        name="endDate"
        className="block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue={defaultValue ? defaultValue : ""}
        required
      />
    </div>
  );
}
