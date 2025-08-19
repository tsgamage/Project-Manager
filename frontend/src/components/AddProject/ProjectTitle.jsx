import { useState } from "react";

export default function ProjectTitle({ defaultValue, onChange, ...props }) {
  const [charCount, setCharCount] = useState(16);

  return (
    <div className="sm:col-span-2 relative">
      <label
        htmlFor="title"
        className="block text-sm sm:text-base font-medium text-white mb-2 sm:mb-3"
      >
        Project Title*
      </label>
      <p
        className={`absolute top-0 right-0 text-sm mt-1 mr-1 sm:mt-2 sm:mr-2 ${charCount > 100 ? "text-red-500" : " text-gray-400 "}`}
      >
        {charCount}/100
      </p>
      <input
        id="title"
        type="text"
        name="title"
        className={`block w-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
          charCount > 100
            ? "border-red-600 rounded-xl bg-red-700/10 focus:ring-red-500 "
            : "border-gray-600 rounded-xl bg-gray-700 focus:ring-blue-500 "
        }`}
        placeholder="Enter project title"
        defaultValue={defaultValue ? defaultValue : "Untitled Project"}
        required
        onChange={(event) => {
          onChange();
          setCharCount(event.target.value.length);
        }}
        {...props}
      />
    </div>
  );
}
