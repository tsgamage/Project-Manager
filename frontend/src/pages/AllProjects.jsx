import { useContext, useEffect, useState } from "react";
import ProjectCard from "../components/AllProjects/ProjectCard.jsx";
import Stats from "../components/AllProjects/Stats.jsx";
import Header from "../components/AllProjects/Header.jsx";
import Sortings from "../components/AllProjects/Sortings.jsx";
import ProjectContext from "../store/project.context.jsx";
import { sortListAccordingToDealine } from "../util/Sorting.js";
import { FolderPlus, FolderSearch, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

let FILTER = "All";
let SORTOPTION = "newest";
let SEARCHQUERY = "";

export default function AllProjectsPage() {
  const { projects } = useContext(ProjectContext);

  const [sortOption, setSortOption] = useState(SORTOPTION);
  const [sortedProjects, setSortedProjects] = useState(projects);
  const [filter, setFilter] = useState(FILTER);
  const [filteredProjects, setFilteredPRojects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState(SEARCHQUERY);
  const [searchedProjects, setSearchedProjects] = useState([]);

  useEffect(() => {
    if (sortOption === "newest") {
      SORTOPTION = "newest";
      setSortedProjects(projects);
    } else if (sortOption === "oldest") {
      SORTOPTION = "oldest";
      setSortedProjects(projects.toReversed());
    } else if (sortOption === "deadline") {
      SORTOPTION = "deadline";
      setSortedProjects(sortListAccordingToDealine(projects));
    }
  }, [sortOption, projects]);

  useEffect(() => {
    if (filter === "All") {
      FILTER = "All";
      setFilteredPRojects(sortedProjects);
      return;
    } else if (filter === "Completed") {
      FILTER = "Completed";
      setFilteredPRojects(() => {
        return sortedProjects.filter((project) => {
          if (project.tasks.length > 0) {
            return project.tasks.every((task) => task.completed === true);
          }
        });
      });
    } else if (filter === "Not Started") {
      FILTER = "Not Started";
      setFilteredPRojects(() => {
        return sortedProjects.filter((project) =>
          project.tasks.every((task) => task.completed === false)
        );
      });
    } else if (filter === "In Progress") {
      FILTER = "In Progress";
      setFilteredPRojects(() => {
        return sortedProjects.filter((project) => {
          const totalTasks = project.tasks.length;
          const completedTasks = project.tasks.filter((task) => task.completed).length;
          return completedTasks > 0 && completedTasks < totalTasks;
        });
      });
    }
  }, [sortedProjects, filter]);

  useEffect(() => {
    SEARCHQUERY = searchQuery;
    const wildcard = `*${searchQuery.trim()}*`;
    try {
      const regex = new RegExp(`^${wildcard.replace(/\*/g, ".*")}$`, "i");
      const titleSeachResearch = filteredProjects.filter((project) => regex.test(project.title));
      const descriptionSeachResearch = filteredProjects.filter((project) =>
        regex.test(project.description)
      );
      const allResult = [...new Set([...titleSeachResearch, ...descriptionSeachResearch])];
      setSearchedProjects(allResult);
    } catch {
      console.log("Tho wage harakek yakow moda musalayek!");
    }
  }, [filteredProjects, searchQuery]);

  function resetFilters(name) {
    if (name === "all") {
      setFilter("All");
      setSortOption("newest");
      setSearchQuery("");
    } else if (name === "filter") {
      setFilter("All");
    } else if (name === "sort") {
      setSortOption("newest");
    } else if (name === "search") {
      setSearchQuery("");
    }
  }

  return (
    <div className="bg-theme-light dark:bg-theme-dark">
      <main className="container mx-auto px-8 py-8">
        <Header />
        <Sortings
          filter={filter}
          setFilter={setFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onReset={resetFilters}
        />

        {/* All Projects Title */}
        <div className="flex items-center gap-3 mb-6 mt-8">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-header-light dark:text-header-dark text-center md:text-left">
            {filter} Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {searchedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* No Projects */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <FolderPlus className="h-24 w-24 mx-auto text-stone-400" />

            <h3 className="text-2xl font-bold text-header-light dark:text-header-dark mt-6">
              No projects found
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mt-3 max-w-md mx-auto">
              Create a new project to get started.
            </p>
            <Link
              to="/project/new"
              className="block w-fit mx-auto mt-6 px-6 py-3 cursor-pointer justify-center border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Create New Project
            </Link>
          </div>
        )}
        {/* Empty State  */}
        {projects.length > 0 && searchedProjects.length === 0 && (
          <div className="text-center py-20">
            <FolderSearch className="h-24 w-24 mx-auto text-stone-400" />

            <h3 className="text-2xl font-bold text-header-light dark:text-header-dark mt-6">
              No projects found
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mt-3 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => resetFilters("all")}
              className="mt-6 px-6 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
