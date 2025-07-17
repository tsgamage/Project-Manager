import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const DUMMY_DATA = [
    {
      title: "Project Alpha",
      desciption: "Develop a new AI-powered analytics platform.",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      status: "In Progress",
    },
    {
      title: "Website Redesign",
      desciption: "Revamp the company's main website for better UX.",
      startDate: "2024-03-01",
      endDate: "2024-08-15",
      status: "Pending",
    },
    {
      title: "Mobile App Development",
      desciption:
        "Create an iOS and Android application for customer engagement.",
      startDate: "2024-02-20",
      endDate: "2024-11-30",
      status: "In Progress",
    },
    {
      title: "Database Migration",
      desciption: "Migrate existing database to a new cloud-based solution.",
      startDate: "2024-04-10",
      endDate: "2024-07-20",
      status: "Completed",
    },
    {
      title: "Marketing Campaign Launch",
      desciption: "Plan and execute a new digital marketing campaign.",
      startDate: "2024-05-01",
      endDate: "2024-09-30",
      status: "In Progress",
    },
    {
      title: "Internal Tool Development",
      desciption: "Build a custom internal tool for project management.",
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      status: "Pending",
    },
    {
      title: "Cloud Infrastructure Setup",
      desciption:
        "Set up and configure new cloud infrastructure for scalability.",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "Completed",
    },
  ];
  return (
    <section className="bg-stone-100 dark:bg-stone-900 p-4 sm:p-6 lg:p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-center uppercase text-stone-700 dark:text-stone-200 mb-12">
        Your Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {DUMMY_DATA.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
