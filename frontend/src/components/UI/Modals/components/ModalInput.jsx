export default function ModalInput({
  id,
  label,
  placeholder,
  type = "text",
  isError,
  inputTip,
  ...props
}) {
  return (
    <div>
      <label
        htmlFor="member-name"
        className={`block text-sm font-medium mb-2 ${isError ? "text-red-500" : "text-white"}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        required
        {...props}
        className={`rounded-lg sm:rounded-xl w-full px-3 sm:px-4 py-2.5 sm:py-3 border focus:outline-none text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base ${
          isError
            ? "border-red-600 bg-red-700/10 placeholder-red-400/60"
            : "border-gray-600  bg-gray-700  placeholder-gray-400"
        }`}
      />
      {inputTip && <p className="text-xs text-gray-400 mt-1">{inputTip}</p>}
    </div>
  );
}