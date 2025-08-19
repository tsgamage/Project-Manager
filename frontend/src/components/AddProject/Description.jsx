import { useState } from "react";

export default function Description({ defaultValue, onChange, ...props }) {
  const [charCount, setCharCount] = useState(0);
  return (
    <div className="sm:col-span-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor="description"
          className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3"
        >
          Description*
        </label>
        <p
          className={`${charCount > 1000 ? "text-red-500" : "text-gray-400"} text-sm sm:text-sm mb-2 sm:mb-3 text-right`}
        >
          {charCount}/1000
        </p>
      </div>
      <textarea
        id="description"
        name="description"
        rows={4}
        className={`resize-y min-h-[100px] block w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
          charCount > 1000
            ? " focus:ring-red-500 border-red-600 rounded-xl bg-red-700/10"
            : " focus:ring-blue-500 border-gray-600 rounded-xl bg-gray-700"
        }`}
        placeholder="Describe the project..."
        defaultValue={defaultValue ? defaultValue : ""}
        onChange={(event) => {
          onChange();
          setCharCount(event.target.value.length);
        }}
        {...props}
        required
      />
      <p className="text-gray-400 text-sm mt-1">
        You can generate a description by AI after creating and adding tasks.
      </p>
    </div>
  );
}
