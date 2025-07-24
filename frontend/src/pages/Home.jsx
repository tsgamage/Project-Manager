import { useRouteLoaderData } from "react-router-dom";
import ProjectCard from "../components/Home/ProjectCard";
import Stats from "../components/Home/Stats";
import Header from "../components/Home/Header";
import Search from "../components/Home/Search";
import { useContext, useEffect } from "react";
import ProjectContext from "../store/project.context";

export default function HomePage() {
  const loaderData = useRouteLoaderData("root");
  const { projects, setProjects } = useContext(ProjectContext);
  window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    setProjects(projects[projects.length - 1]._id === "DUMMY" ? loaderData.data : projects);
  }, []);

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
      <main className="container mx-auto px-4 py-8">
        <Stats />
        <Header />
        <Search />

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
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
              onClick={() => {
                setFilter("All");
                setSearchQuery("");
              }}
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
