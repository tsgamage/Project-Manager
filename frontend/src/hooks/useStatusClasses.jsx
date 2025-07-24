import { useCallback, useEffect, useState } from "react";

export default function useStatusClasses(progress, initialValue) {
  const [status, setStatus] = useState(initialValue || "Not Started");
  const [statusClasses, setStausClasses] = useState();

  const getStatusClasses = useCallback((status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "";
    }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setStatus("Completed");
    } else if (progress > 0) {
      setStatus("In Progress");
    } else {
      setStatus("Not Started");
    }
  }, [progress]);

  useEffect(() => {
    setStausClasses(getStatusClasses(status));
  }, [status, getStatusClasses]);

  return { status, statusClasses };
}
