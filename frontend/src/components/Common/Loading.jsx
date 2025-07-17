import { useState, useEffect } from "react";

const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
    purple: "text-purple-500",
    pink: "text-pink-500",
    indigo: "text-indigo-500",
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
    </div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

export const Loading = ({
  type = "spinner",
  message = "Loading...",
  fullPage = false,
}) => {
  const renderLoader = () => {
    switch (type) {
      case "bar":
        return <LoadingBar />;
      case "dots":
        return <LoadingDots />;
      case "spinner":
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullPage ? "fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50" : ""
      }`}
    >
      {renderLoader()}
      {message && (
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
          {message}
        </p>
      )}
    </div>
  );
};
