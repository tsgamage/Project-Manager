import { useContext, useEffect, useState } from "react";
import ProjectCard from "../components/AllProjects/ProjectCard.jsx";
import ProjectListCard from "../components/AllProjects/ProjectListCard.jsx";
import Header from "../components/AllProjects/Header.jsx";
import Sortings from "../components/AllProjects/Sortings.jsx";
import ProjectContext from "../store/project.context.jsx";
import { sortListAccordingToDealine } from "../util/Sorting.js";
import { FolderPlus, FolderSearch, Grid3X3, List } from "lucide-react";
import LinkButton from "../components/UI/Elements/LinkButton.jsx";
import { Tooltip } from "react-tooltip";

let FILTER = "All";
let SORTOPTION = "newest";
let SEARCHQUERY = "";
let VIEWMODE = "grid";

export default function AllProjectsPage() {
  const { projects } = useContext(ProjectContext);

  const [sortOption, setSortOption] = useState(SORTOPTION);
  const [sortedProjects, setSortedProjects] = useState(projects);
  const [filter, setFilter] = useState(FILTER);
  const [filteredProjects, setFilteredPRojects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState(SEARCHQUERY);
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [viewMode, setViewMode] = useState(VIEWMODE);

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

  function changeViewMod(mode) {
    if (mode === "grid") {
      VIEWMODE = "grid";
      setViewMode("grid");
    } else if (mode === "list") {
      VIEWMODE = "list";
      setViewMode("list");
    }
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <Header />

        <div className="max-w-7xl mx-auto">
          {projects.length > 1 && <Sortings
            filter={filter}
            setFilter={setFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onReset={resetFilters}
          />}

          {/* All Projects Title and View Toggle */}
          <div className="flex items-center justify-between gap-3 mb-8 mt-8">
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-para-light">
              Showing: {filter} Projects
            </h2>

            {/* View Toggle Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeViewMod("grid")}
                className={`_grid-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
                  }`}
                title="Grid View"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <Tooltip anchorSelect="._grid-view">Grid View</Tooltip>

              <button
                onClick={() => changeViewMod("list")}
                className={`_list-view cursor-pointer p-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/70"
                  }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
              <Tooltip anchorSelect="._list-view">List View</Tooltip>
            </div>
          </div>

          {/* Projects Display */}
          {viewMode === "grid" &&
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {searchedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          }

          {viewMode === "list" &&
            <div className="space-y-3">
              {searchedProjects.map((project) => (
                <ProjectListCard key={project._id} project={project} />
              ))}
            </div>
          }

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
              <LinkButton paddingClasses="px-8 py-4 inline-block mt-4" link="/project/new">
                Create New Project
              </LinkButton>
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
