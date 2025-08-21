import { memberActions } from "./member.slice";
import {
  createMemberRequest,
  deleteMemberRequest,
  getAllMembersRequest,
  updateMemberRequest,
} from "../services/member.api";
import {
  createMemberCategoryRequest,
  deleteMemberCategoryRequest,
  getMemberCategoriesRequest,
  updateMemberCategoryRequest,
} from "../services/memberCategory.api";
import { updateProjectRequest } from "../services/project.api";
import { projectActions } from "./project.slice";

export const fetchMembersThunk = () => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await getAllMembersRequest();

    const updatedList = resData.data;
    updatedList.sort((a, b) => a.name.localeCompare(b.name));

    if (resData.success) {
      dispatch(memberActions.setMembers(updatedList));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const createNewMemberThunk = (memberData) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { members } = getState().team;

    const resData = await createMemberRequest(memberData);

    const updatedList = [resData.data, ...members];
    updatedList.sort((a, b) => a.name.localeCompare(b.name));

    if (resData.success) {
      dispatch(memberActions.setMembers(updatedList));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const updateMemberThunk = (memberID, memberData) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { members } = getState().team;

    const updatedList = members.filter((m) => m._id !== memberID);

    const resData = await updateMemberRequest(memberID, memberData);

    updatedList.push(resData.data);
    updatedList.sort((a, b) => a.name.localeCompare(b.name));

    if (resData.success) {
      dispatch(memberActions.setMembers(updatedList));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const deleteMemberThunk = (memberID) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { members } = getState().team;
    const { projects } = getState().project;

    const updatedList = members.filter((m) => m._id !== memberID);
    updatedList.sort((a, b) => a.name.localeCompare(b.name));

    // * First We need to remove that memeber from all the projects
    // * Otherwise not it can cause to a error when rendering projects. If member deleted without removing it from projects
    const projectWithThisMember = projects.filter((p) => p.team.includes(memberID));

    // Removing the Member from all projects in database
    if (projectWithThisMember.length > 0) {
      projectWithThisMember.forEach(async (project) => {
        const newProjectWithoutMember = {
          ...project,
          team: project.team.filter((id) => id !== memberID),
        };
        await updateProjectRequest(project._id, newProjectWithoutMember);
      });
    }

    // Removing the Member from all projects in state
    const newProjects = projects.map((project) => {
      const newTeam = project.team.filter((id) => id !== memberID);
      return { ...project, team: newTeam };
    });

    dispatch(projectActions.setProjects(newProjects));
    dispatch(projectActions.clearSelectedProject());
    dispatch(projectActions.clearSelectedProjectID());

    const resData = await deleteMemberRequest(memberID);

    if (resData.success) {
      dispatch(memberActions.setMembers(updatedList));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const fetchMemberCategoriesThunk = () => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await getMemberCategoriesRequest();

    if (resData.success) {
      dispatch(memberActions.setMemberCategories(resData.data));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const createNewMemberCategoryThunk = (categoryData) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { memberCategories } = getState().team;

    const resData = await createMemberCategoryRequest(categoryData);

    if (resData.success) {
      dispatch(memberActions.setMemberCategories([...memberCategories, resData.data]));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const updateMemberCategoryThunk = (categoryID, categoryData) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { memberCategories } = getState().team;

    const updatedList = memberCategories.filter((cat) => cat._id !== categoryID);

    const resData = await updateMemberCategoryRequest(categoryID, categoryData);

    if (resData.success) {
      dispatch(memberActions.setMemberCategories([...updatedList, resData.data]));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const deleteMemberCategoryThunk = (categoryID) => {
  return async (dispatch, getState) => {
    dispatch(memberActions.setIsLoading(true));
    const { memberCategories } = getState().team;

    const updatedList = memberCategories.filter((cat) => cat._id !== categoryID);

    const resData = await deleteMemberCategoryRequest(categoryID);

    if (resData.success) {
      dispatch(memberActions.setMemberCategories(updatedList));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};
