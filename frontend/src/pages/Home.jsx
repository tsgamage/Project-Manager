import { useRouteLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProjectCard from "../components/Home/ProjectCard.jsx";
import Stats from "../components/Home/Stats.jsx";
import Header from "../components/Home/Header.jsx";
import Sortings from "../components/Home/Sortings.jsx";
import ProjectContext from "../store/project.context.jsx";
import { sortListAccordingToDealine } from "../util/Sorting.js";

let FILTER = "All";
let SORTOPTION = "newest";
let SEARCHQUERY = "";

export default function HomePage() {
  const loaderData = useRouteLoaderData("root");
  const { projects, setProjects } = useContext(ProjectContext);

  const [sortOption, setSortOption] = useState(SORTOPTION);
  const [sortedProjects, setSortedProjects] = useState(projects);
  const [filter, setFilter] = useState(FILTER);
  const [filteredProjects, setFilteredPRojects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState(SEARCHQUERY);
  const [searchedProjects, setSearchedProjects] = useState([]);

  useEffect(() => {
    setProjects(projects[projects.length - 1]._id === "DUMMY" ? loaderData.data : projects);
  }, []);

  useEffect(() => {
    setFilteredPRojects(projects);
    setSortedProjects(projects);
  }, [projects]);

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
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <main className="container mx-auto px-4 py-8">
        <Stats />
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
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-header-light dark:text-header-dark mb-6 mt-8 text-center md:text-left">
          {filter} Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {searchedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {searchedProjects.length === 0 && (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-header-light dark:text-header-dark mt-6">
              No projects found
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mt-3 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => resetFilters("all")}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function projectsLoader() {
  try {
    const response = await fetch("http://localhost:3000/api/project/");

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 500,
      });
    }
    return response;
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
}
