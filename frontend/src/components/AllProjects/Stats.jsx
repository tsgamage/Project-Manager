import { FolderOpen, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";

export default function Stats() {
  const projects = useSelector((state) => state.project.projects);

  function totalProjects() {
    return projects.length;
  }

  function completedProjects() {
    return projects.filter(
      (project) =>
        project.tasks.length > 0 && project.tasks.every((task) => task.completed === true)
    ).length;
  }

  function notStarted() {
    return projects.filter((project) => project.tasks.every((task) => task.completed === false))
      .length;
  }

  const inprogress = totalProjects() - (completedProjects() + notStarted());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-yellow-400">{totalProjects()}</p>
          </div>
          <FolderOpen className="h-8 w-8 text-yellow-400" />
        </div>
      </div>

      <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-blue-400">{inprogress}</p>
          </div>
          <Clock className="h-8 w-8 text-blue-400" />
        </div>
      </div>

      <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-400">{completedProjects()}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
      </div>

      <div className="gradient-card rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Not Started</h3>
            <p className="text-3xl font-bold text-gray-400">{notStarted()}</p>
          </div>
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
