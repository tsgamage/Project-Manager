export default function Description({ defaultValue }) {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="description"
        className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3"
      >
        Description*
      </label>
      <textarea
        id="description"
        name="description"
        rows={4}
        className="block w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border border-gray-600 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
        placeholder="Describe the project..."
        defaultValue={defaultValue ? defaultValue : ""}
        required
      />
    </div>
  );
}
