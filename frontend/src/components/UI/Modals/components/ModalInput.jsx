export default function ModalInput({ id, label, placeholder, type = "text", ...props }) {
    return (
        <div>
            <label
                htmlFor="member-name"
                className="block text-sm font-medium text-white mb-2"
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-lg sm:rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
        </div>
    )
}