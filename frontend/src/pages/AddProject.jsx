import ProjectTitle from "../components/AddProject/ProjectTitle.jsx";
import StartDate from "../components/AddProject/StartDate.jsx";
import EndDate from "../components/AddProject/EndDate.jsx";
import Description from "../components/AddProject/Description.jsx";
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

      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto p-4 sm:p-6">
          <Header />

          <div className="glass rounded-2xl shadow-lg border border-gray-700 p-6 sm:p-8 ">
            <form action={formActionState} className="space-y-8 sm:space-y-10">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Basic Information</h3>
                  <p className="text-gray-400 text-sm">Set up your project details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProjectTitle defaultValue={formState?.title} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StartDate defaultValue={formState?.startDate} />
                    <EndDate defaultValue={formState?.endDate} />
                  </div>
                  <Description defaultValue={formState?.description} />
                </div>
              </div>

              {/* Team Members / Tasks Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-2">Team & Project Tasks</h3>
                <p className="text-gray-400 text-sm">
                  You can add Members and Tasks after this project created
                </p>
              </div>

              {/* Tasks Section */}
              {/* <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Project Tasks</h3>
                    <p className="text-gray-400 text-sm">Define the tasks for your project</p>
                  </div>
                  <ProjectTasks tasks={tasks} onAddTask={setTasks} />
                </div> */}

              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold gradient-blue hover:shadow-lg text-white rounded-xl flex items-center justify-center transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? "Creating Project..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
