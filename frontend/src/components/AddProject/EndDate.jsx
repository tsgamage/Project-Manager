export default function EndDate({ defaultValue }) {
  return (
    <div>
      <label
        htmlFor="endDate"
        className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3"
      >
        End Date*
      </label>
      <input
        id="endDate"
        type="date"
        name="endDate"
        className="block w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        defaultValue={defaultValue ? defaultValue : ""}
        required
      />
    </div>
  );
}
