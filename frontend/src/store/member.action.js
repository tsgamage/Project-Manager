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

export const fetchMembersThunk = () => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await getAllMembersRequest();

    if (resData.success) {
      dispatch(memberActions.fetchMembers(resData.data));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const createNewMemberThunk = (memberData) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await createMemberRequest(memberData);

    if (resData.success) {
      dispatch(memberActions.addMember(resData.data));
    }
    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const updateMemberThunk = (memberID, memberData) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await updateMemberRequest(memberID, memberData);

    if (resData.success) {
      dispatch(memberActions.updateMember(resData.data));
    }
    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const deleteMemberThunk = (memberID) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await deleteMemberRequest(memberID);

    if (resData.success) {
      dispatch(memberActions.deleteMember(memberID));
    }

    // TODO: Delete this member from all project that has assigned

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const fetchMemberCategoriesThunk = () => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await getMemberCategoriesRequest();

    if (resData.success) {
      dispatch(memberActions.fetchMemberCategories(resData.data));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const createNewMemberCategoryThunk = (categoryData) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await createMemberCategoryRequest(categoryData);

    if (resData.success) {
      dispatch(memberActions.addMemberCategory(resData.data));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const updateMemberCategoryThunk = (categoryID, categoryData) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await updateMemberCategoryRequest(categoryID, categoryData);

    if (resData.success) {
      dispatch(memberActions.updateMemberCategory(resData.data));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};

export const deleteMemberCategoryThunk = (categoryID) => {
  return async (dispatch) => {
    dispatch(memberActions.setIsLoading(true));

    const resData = await deleteMemberCategoryRequest(categoryID);

    if (resData.success) {
      dispatch(memberActions.deleleMemberCategory(categoryID));
    }

    dispatch(memberActions.setIsLoading(false));
    return resData;
  };
};
