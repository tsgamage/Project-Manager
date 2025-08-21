import { useEffect, useRef, useState } from "react";
import CategoryAccordion from "../components/Tasks/CategoryAccordion";
import { CheckCircle, Clock, Search, X, List, Target } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../store/project.slice";

export default function TasksPage() {
  const projects = useSelector((state) => state.project.projects);
  const tasksCategories = useSelector((state) => state.project.tasksCategories);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [showFilter, setShowFilter] = useState("all");
  const [expandAll, setExpandAll] = useState(true);

  const searchBarRef = useRef();

  useEffect(() => {
    const allTasks = [];
    projects?.forEach((pro) => pro.tasks.forEach((task) => allTasks.push(task)));
    setTasks(allTasks);
    setFilteredTasks(allTasks);
  }, [projects]);

  // Filtering logic
  let filteredCategories = tasksCategories.filter((category) => {
    const project = projects.find((p) => p._id === category.projectID);
    const categoryTasks = tasks.filter((t) => t.taskCategory === category._id);

    if (filterProject !== "all" && category.projectID !== filterProject) {
      return false;
    }

    // If there are no tasks in this category, still show the category
    if (categoryTasks.length === 0) {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        // Show if project title or category name matches search
        if (
          (project && project.title.toLowerCase().includes(searchLower)) ||
          (category.categoryName && category.categoryName.toLowerCase().includes(searchLower))
        ) {
          return true;
        }
        return false;
      }
      return true;
    }

    const tasksToConsider = categoryTasks.filter((task) => {
      if (
        searchQuery &&
        !task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Show the category if it has any matching tasks, or if it has no tasks (handled above)
    return tasksToConsider.length > 0;
  });

  function handleShowFilter(value) {
    if (value === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    }
    if (value === "not_completed") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
    if (value === "all") {
      setFilteredTasks(tasks);
    }
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    categories: tasksCategories.length,
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === "k") || e.key === "K") {
        e.preventDefault(); // stop default behavior (like form submit)
        searchBarRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto max-sm:px-2 p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">All Tasks</h1>
              <div className="w-16 h-1 gradient-blue rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-gray-400">Manage and track all tasks across your projects</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="gradient-card rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-purple-400">{stats.categories}</p>
              </div>
              <List className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl shadow-lg border border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks or projects..."
                  ref={searchBarRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    className="absolute bg-gray-700 cursor-pointer inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors rounded-lg"
                    onClick={() => setSearchQuery("")}
                    tabIndex={0}
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  </button>
                )}
              </div>
            </div>
            {/* Project Filter */}
            <div>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title.length > 30 ? project.title.slice(0, 30) + "..." : project.title}
                  </option>
                ))}
              </select>
            </div>
            {/* Show Filter */}
            <div>
              <select
                value={showFilter}
                onChange={(e) => {
                  setShowFilter(e.target.value);
                  handleShowFilter(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Show All</option>
                <option value="completed">Show Completed</option>
                <option value="not_completed">Show Not Completed</option>
              </select>
            </div>
            {/* Expand/Collapse All Button */}
            <div className="flex items-center">
              <button
                onClick={() => setExpandAll(!expandAll)}
                className={`w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white font-medium transition-colors hover:bg-blue-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                type="button"
              >
                {expandAll ? "Expand All" : "Collapse All"}
              </button>
            </div>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="space-y-4">
          {filteredCategories.length > 0 &&
            filteredCategories.map((category) => (
              <CategoryAccordion
                key={category._id + expandAll}
                category={category}
                tasks={filteredTasks.filter(
                  (t) =>
                    t.taskCategory === category._id &&
                    (t.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      t.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()))
                )}
                projectTitle={projects.find((p) => p._id === category.projectID)?.title}
                onClick={() => dispatch(projectActions.setSelecteProjectID(category.projectID))}
                closedAccodion={expandAll}
                hideAddTask={
                  showFilter === "completed" || showFilter === "not_completed" || searchQuery !== ""
                }
                tasksCount={
                  showFilter !== "all" &&
                  filteredTasks.filter((t) => t.taskCategory === category._id).length
                }
                hideCompletedIcon
              />
            ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
