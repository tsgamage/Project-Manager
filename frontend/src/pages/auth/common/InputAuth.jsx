import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ErrorText from "./ErrorText";

export default function InputAuth({
  name,
  password,
  icon,
  placeholder,
  label,
  checkbox,
  errorText,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  let inputType = "text";
  if (password) inputType = showPassword ? "text" : "password";

  return (
    <div>
      {!checkbox && (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-white mb-2"
          >
            {label}
          </label>
          <div className="relative">
            <input
              id={name}
              name={name}
              type={inputType}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 border border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all duration-300"
              placeholder={placeholder}
              required
              {...props}
            />

            {!password && icon && (
              <div className="absolute w-7 inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                {icon}
              </div>
            )}
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-8 flex items-center cursor-pointer inset-y-0 pr-3 right-0 text-gray-400 hover:text-gray-300 transition-colors"
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
          {errorText && <ErrorText text={errorText} />}
        </div>
      )}

      {checkbox && (
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
            {...props}
          />
          <label htmlFor={name} className="ml-2 block text-sm text-gray-300">
            {label}
          </label>
        </div>
      )}
    </div>
  );
}
