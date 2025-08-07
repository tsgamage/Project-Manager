import { createContext, useContext, useEffect, useState } from "react";
import { createMember, deleteMember, getAllMembers, updateMember } from "../services/member.api.js";
import {
  addMemberCategory,
  deleteMemberCategory,
  getMemberCategories,
  updateMemberCategory,
} from "../services/memberCategory.api.js";
import AuthContext from "./auth.context.jsx";

const MemberContext = createContext({
  members: [],
  setMembers: () => {},
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},

  setMemberCategories: () => {},
  addMemberCategory: () => {},
  updateMemberCategory: () => {},
  deleteCategory: () => {},
});

export function MemberContextProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [memberCategories, setMemberCategories] = useState([]);

  // ------------ Fetching Members & Categories  ------------

  async function handleFetchCategories() {
    const resData = await getMemberCategories();
    if (resData.success) {
      setMemberCategories(resData.data);
    }
  }

  async function handleFetchMembers() {
    const resData = await getAllMembers();
    console.log("fetched members", resData.data);
    if (resData.success) {
      const updatedList = resData.data;
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      // Sort the list alphabetically
      setMembers(updatedList);
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
      const updatedList = [...members, resData.data];
      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setMembers(updatedList);
    }
    return resData;
  }

  async function handleUpdateMember(memberID, memberData) {
    const resData = await updateMember(memberID, memberData);
    if (resData.success) {
      const updatedList = members.filter((m) => m._id !== memberID);
      updatedList.push(resData.data);

      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setMembers(updatedList);
    }
    return resData;
  }

  async function handleDeleteMember(memberID) {
    const resData = await deleteMember(memberID);
    if (resData.success) {
      const updatedList = members.filter((m) => m._id !== memberID);
      // Sort the list alphabetically
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
      setMembers(updatedList);
    }
  }

  // ------------ Category ------------

  async function handleAddMemberCategory(categoryObj) {
    const resData = await addMemberCategory(categoryObj);
    if (resData.success) {
      const updatedList = [...memberCategories, resData.data];
      setMemberCategories(updatedList);
    }
    return resData;
  }

  async function handleUpdateMemberCategory(categoryID, categoryName) {
    const resData = await updateMemberCategory(categoryID, categoryName);
    if (resData.success) {
      const updatedList = memberCategories.filter((m) => m._id !== categoryID);
      updatedList.push(resData.data);
      setMemberCategories(updatedList);
    }
    return resData;
  }

  async function handleDeleteCategory(categoryID) {
    const resData = await deleteMemberCategory(categoryID);
    if (resData.success) {
      const updatedList = memberCategories.filter((m) => m._id !== categoryID);
      setMemberCategories(updatedList);
    }
    return resData;
  }

  const memberCtxValue = {
    members,
    setMembers,
    addMember: handleAddMember,
    updateMember: handleUpdateMember,
    deleteMember: handleDeleteMember,

    memberCategories,
    setMemberCategories,
    addMemberCategory: handleAddMemberCategory,
    deleteCategory: handleDeleteCategory,
    updateMemberCategory: handleUpdateMemberCategory,
  };
  return <MemberContext.Provider value={memberCtxValue}>{children}</MemberContext.Provider>;
}

export default MemberContext;
