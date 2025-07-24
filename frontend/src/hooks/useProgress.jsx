import { useCallback, useEffect, useState } from "react";

export default function useProgress(project) {
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback(
    function calculateProgress() {
      const allTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (task) => task.completed
      ).length;
      setProgress(Math.floor((completedTasks / allTasks) * 100));
    },
    [project.tasks]
  );

  useEffect(() => {
    calculateProgress();
  }, [project.tasks, calculateProgress]);

  return progress;
}
