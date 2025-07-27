import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputAuth({
  name,
  password,
  icon,
  placeholder,
  label,
  checkbox,
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
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
          >
            {label}
          </label>
          <div className="relative">
            <input
              id={name}
              name={name}
              type={inputType}
              className="w-full px-4 py-3 pr-10 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 transition-colors"
              placeholder={placeholder}
              required
              {...props}
            />

            {!password && icon && (
              <div className="absolute w-7 inset-y-0 right-0 pr-3 flex items-center pointer-events-none  text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
                {icon}
              </div>
            )}
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute w-8 flex items-center cursor-pointer inset-y-0 pr-3 right-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            )}
          </div>
        </div>
      )}

      {checkbox && (
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700"
            {...props}
          />
          <label htmlFor={name} className="ml-2 block text-sm text-stone-700 dark:text-stone-300">
            {label}
          </label>
        </div>
      )}
    </div>
  );
}
