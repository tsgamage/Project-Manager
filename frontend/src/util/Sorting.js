export function sortListAccordingToDealine(list) {
  const today = new Date();

  // Filter out projects that are fully completed (all tasks completed and at least one task exists)
  const completedProjects = list.filter(
    (project) => project.tasks.length > 0 && project.tasks.every((t) => t.completed === true)
  );
  const incompleteProjects = list.filter(
    (project) => !(project.tasks.length > 0 && project.tasks.every((t) => t.completed === true))
  );

  // Sort by days remaining until deadline (soonest first)
  const sortedByDeadline = incompleteProjects.slice().sort((a, b) => {
    const aDays = Math.ceil((new Date(a.endDate) - today) / (1000 * 60 * 60 * 24));
    const bDays = Math.ceil((new Date(b.endDate) - today) / (1000 * 60 * 60 * 24));
    return aDays - bDays;
  });

  return sortedByDeadline.concat(completedProjects)
}
// Old sorting function
// export function sortListAccordingToDealine(list) {
//   let daysList = [];
//   list.forEach((project) => {
//     const endDate = new Date(project.endDate);
//     const today = new Date();
//     const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

//     daysList.push(daysRemaining);
//   });

//   const sortedDayslist = daysList.toSorted((a, b) => a - b);

//   list.forEach((project) => {
//     const endDate = new Date(project.endDate);
//     const today = new Date();
//     const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

//     const index = sortedDayslist.indexOf(daysRemaining);

//     if (project.tasks.length > 0 && project.tasks.every((t) => t.completed === true)) {
//       sortedDayslist.splice(index, 1);
//       return;
//     }

//     sortedDayslist[index] = project;
//   });

//   return sortedDayslist;
// }
