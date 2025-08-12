import { createContext, useContext, useEffect, useState } from "react";
import {
  createMember,
  deleteMember,
  getAllMembers,
  updateMember,
  updateProjectByID,
} from "../services/member.api.js";
import {
  addMemberCategory,
  deleteMemberCategory,
  getMemberCategories,
  updateMemberCategory,
} from "../services/memberCategory.api.js";
import AuthContext from "./auth.context.jsx";
import ProjectContext from "./project.context.jsx";

const MemberContext = createContext({
  fetchedMembers: [],
  setFetchedMembers: () => {},
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},

  fetchedMemberCategories: [],
  setFetchMemberCategories: () => {},
  addMemberCategory: () => {},
  updateMemberCategory: () => {},
  deleteCategory: () => {},
});

export function MemberContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { projects, setProjects, updateProject } = useContext(ProjectContext);
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [fetchedMemberCategories, setFetchMemberCategories] = useState([]);

  // ------------ Fetching Members & Categories  ------------

  async function handleFetchCategories() {
    const resData = await getMemberCategories();
    if (resData.success) {
      setFetchMemberCategories(resData.data);
    }
  }

  async function handleFetchMembers() {
    const resData = await getAllMembers();
    if (resData.success) {
      const updatedList = resData.data;
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      // Sort the list alphabetically
      setFetchedMembers(updatedList);
    }
  }

  // Automaticaly refetch the data when user changed (user logged out and logged in)
  useEffect(() => {
    handleFetchMembers();
    handleFetchCategories();
  }, [user]);

  // ------------ Member ------------

  async function handleAddMember(memberObj) {
    const resData = await createMember(memberObj);
    if (resData.success) {
      const updatedList = [...fetchedMembers, resData.data];
      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setFetchedMembers(updatedList);
    }
    return resData;
  }

  async function handleUpdateMember(memberID, memberData) {
    const resData = await updateMember(memberID, memberData);
    if (resData.success) {
      const updatedList = fetchedMembers.filter((m) => m._id !== memberID);
      updatedList.push(resData.data);

      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setFetchedMembers(updatedList);
    }
    return resData;
  }

  async function handleDeleteMember(memberID) {
    const resData = await deleteMember(memberID);
    if (resData.success) {
      const updatedList = fetchedMembers.filter((m) => m._id !== memberID);
      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setFetchedMembers(updatedList);
    }

    const projectWithThisMember = projects.filter((p) => p.team.includes(memberID));

    // Removing the Member from all projects in database
    if (projectWithThisMember.length > 0) {
      projectWithThisMember.forEach(async (project) => {
        const newProjectWithoutMember = {
          ...project,
          team: project.team.filter((id) => id !== memberID),
        };
        await updateProjectByID(project._id, newProjectWithoutMember);
      });
    }

    // Removing the Member from all projects in state
    const newProjects = projects.map((project) => {
      const newTeam = project.team.filter((id) => id !== memberID);
      return { ...project, team: newTeam };
    });
    setProjects(newProjects);
  }
  // ------------ Category ------------

  async function handleAddMemberCategory(categoryObj) {
    const resData = await addMemberCategory(categoryObj);
    if (resData.success) {
      const updatedList = [...fetchedMemberCategories, resData.data];
      setFetchMemberCategories(updatedList);
    }
    return resData;
  }

  async function handleUpdateMemberCategory(categoryID, categoryName) {
    const resData = await updateMemberCategory(categoryID, categoryName);
    if (resData.success) {
      const updatedList = fetchedMemberCategories.filter((m) => m._id !== categoryID);
      updatedList.push(resData.data);
      setFetchMemberCategories(updatedList);
    }
    return resData;
  }

  async function handleDeleteCategory(categoryID) {
    const resData = await deleteMemberCategory(categoryID);
    if (resData.success) {
      const updatedList = fetchedMemberCategories.filter((m) => m._id !== categoryID);
      setFetchMemberCategories(updatedList);
    }
    return resData;
  }

  const memberCtxValue = {
    fetchedMembers,
    setFetchedMembers,
    addMember: handleAddMember,
    updateMember: handleUpdateMember,
    deleteMember: handleDeleteMember,

    fetchedMemberCategories,
    setFetchMemberCategories,
    addMemberCategory: handleAddMemberCategory,
    deleteCategory: handleDeleteCategory,
    updateMemberCategory: handleUpdateMemberCategory,
  };
  return <MemberContext.Provider value={memberCtxValue}>{children}</MemberContext.Provider>;
}

export default MemberContext;
