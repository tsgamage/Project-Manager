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
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <Header />
        
        <div className="max-w-7xl mx-auto">
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
          <div className="flex items-center gap-3 mb-8 mt-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {filter} Projects
            </h2>
            <div className="w-16 h-1 gradient-blue rounded-full"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchedProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {/* No Projects */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 gradient-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FolderPlus className="h-12 w-12 text-gray-300" />
              </div>

              <h3 className="text-2xl font-bold text-white mt-6">
                No projects found
              </h3>
              <p className="text-gray-400 mt-3 max-w-md mx-auto">
                Create a new project to get started.
              </p>
              <Link
                to="/project/new"
                className="inline-block mt-6 px-8 py-4 cursor-pointer gradient-blue hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-300 hover-lift"
              >
                Create New Project
              </Link>
            </div>
          )}
          
          {/* Empty State  */}
          {projects.length > 0 && searchedProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 gradient-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FolderSearch className="h-12 w-12 text-gray-300" />
              </div>

              <h3 className="text-2xl font-bold text-white mt-6">
                No projects found
              </h3>
              <p className="text-gray-400 mt-3 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => resetFilters("all")}
                className="mt-6 px-8 py-4 cursor-pointer gradient-blue hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-300 hover-lift"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
