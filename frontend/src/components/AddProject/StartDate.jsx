export default function StartDate({ defaultValue }) {
  return (
    <div>
      <label
        htmlFor="startDate"
        className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3"
      >
        Start Date*
      </label>
      <input
        id="startDate"
        type="date"
        name="startDate"
        className="block w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        required
        defaultValue={defaultValue ? defaultValue : new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}
