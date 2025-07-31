import { useCallback, useEffect, useState } from "react";

export default function useStatusClasses(progress, initialValue) {
  const [status, setStatus] = useState(initialValue || "Not Started");
  const [statusClasses, setStausClasses] = useState();

  const getStatusClasses = useCallback((status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Not Started":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
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
