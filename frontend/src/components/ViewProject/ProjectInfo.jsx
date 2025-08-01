import { useContext } from "react"
import ProjectContext from "../../store/project.context"
import useProgress from "../../hooks/useProgress";
import useStatusClasses from "../../hooks/useStatusClasses";
import { Info, } from "lucide-react";
import ProjectActions from "./ProjectActions";

export default function ProjectInfo() {
    const { selectedProject } = useContext(ProjectContext)

    const progress = useProgress(selectedProject);
    const { status, statusClasses } = useStatusClasses(progress);

    return (
        <div className="glass rounded-2xl shadow-lg border border-gray-700 p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">

                    <div className="mb-5">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                            <Info className="h-5 w-5 text-blue-400" />
                            Project Info
                        </h2>
                        <p className="text-sm text-gray-400">
                            See all info about your project
                        </p>
                    </div>

                    <dl className="divide-y divide-gray-800">
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">Start Date</dt>
                            <dd className="text-white text-sm font-medium">
                                {selectedProject.startDate
                                    ? new Date(selectedProject.startDate).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : "N/A"}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">End Date</dt>
                            <dd className="text-white text-sm font-medium">
                                {selectedProject.endDate
                                    ? new Date(selectedProject.endDate).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : "N/A"}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">Status</dt>
                            <dd>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses}`}
                                >
                                    {status}
                                </span>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">Progress</dt>
                            <dd className="text-white text-sm font-semibold">{progress || 0}%</dd>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">Team Size</dt>
                            <dd className="text-white text-sm font-medium">
                                {selectedProject.team?.length ?? 0}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <dt className="text-gray-400 text-sm">Total Tasks</dt>
                            <dd className="text-white text-sm font-medium">
                                {selectedProject.tasks?.length ?? 0}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="border-t border-red-800/10 px-6 py-4 bg-red-900/5">
                <ProjectActions />
            </div>
        </div>
    )
}