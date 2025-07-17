import {Link} from "react-router-dom";

export default function ProjectCard({project}) {
    const {title, desciption, startDate, endDate, status} = project;

    // Helper to get status-specific colors
    const getStatusClasses = (status) => {
        switch (status) {
            case "In Progress":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "Completed":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "Not Started":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
            default:
                return "";
        }
    };

    return (
        <Link
            to={`project/view/${title}`}
            className="bg-white dark:bg-stone-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">
                        {title}
                    </h3>
                    <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusClasses(
                            status
                        )}`}
                    >
            {status}
          </span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 mb-6">{desciption}</p>
                <div className="flex justify-between items-center text-sm text-stone-500 dark:text-stone-400">
                    <p>
                        <span className="font-semibold">Start:</span>{" "}
                        {new Date(startDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-semibold">End:</span>{" "}
                        {new Date(endDate).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Link>
    );
}
