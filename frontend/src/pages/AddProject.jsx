import ProjectTitle from "../components/AddProject/ProjectTitle.jsx";
import StartDate from "../components/AddProject/StartDate.jsx";
import EndDate from "../components/AddProject/EndDate.jsx";
import Description from "../components/AddProject/Description.jsx";
import TeamMembers from "../components/AddProject/TeamMembers/TeamMembers.jsx";
import ProjectTasks from "../components/AddProject/Tasks/ProjectTasks.jsx";
import Header from "../components/AddProject/Header.jsx";
import { useActionState, useContext, useState } from "react";
import ProjectContext from "../store/project.context";
import { useNavigate } from "react-router-dom";
import SuccessErrorModal from "../components/UI/Modals/SuccessErrorModal.jsx";
import { useRef } from "react";

export default function AddProjectPage() {
  const modal = useRef();
  const navigate = useNavigate();
  const { addNewProject } = useContext(ProjectContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalData, setModalData] = useState({
    type: "success",
    message: "Your project has been created successfully!",
  });

  async function AddProjectForm(preState, formData) {
    const formObj = Object.fromEntries(formData);

    const newProjectData = {
      ...formObj,
      team: teamMembers.map(({ id, ...rest }) => rest),
      tasks: tasks.map(({ id, ...rest }) => rest),
    };

    try {
      await addNewProject(newProjectData);
      modal.current.open();
      return;
    } catch {
      setModalData({
        type: "error",
        message: "Something Went Wrong!",
      });
      modal.current.open();
      return;
    }
  }

  const [formState, formActionState, pending] = useActionState(AddProjectForm);
  return (
    <>
      <SuccessErrorModal
        ref={modal}
        onClose={() => {
          navigate("/project/new");
          setTeamMembers([]);
          setTasks([]);
          modal.current.close();
        }}
        onGoHome={() => navigate("/")}
        onStay={() => {
          navigate("/project/new");
          setTeamMembers([]);
          setTasks([]);
          modal.current.close();
        }}
        type={modalData.type}
        message={modalData.message}
      />

      <div className="min-h-screen bg-theme-light dark:bg-theme-dark">
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <Header />

          <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md p-4 sm:p-6">
            <form action={formActionState} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <ProjectTitle defaultValue={formState?.title} />
                <StartDate defaultValue={formState?.startDate} />
                <EndDate defaultValue={formState?.endDate} />
                <Description defaultValue={formState?.description} />
              </div>
              <TeamMembers members={teamMembers} onAddMember={setTeamMembers} />
              <ProjectTasks tasks={tasks} onAddTask={setTasks} />

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-stone-200 dark:border-stone-700">
                {/* <button
                type="button"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center justify-center transition-colors text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                Cancel
              </button> */}
                <button
                  type="submit"
                  disabled={pending}
                  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  {pending ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
