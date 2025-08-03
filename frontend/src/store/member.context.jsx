import {createContext, useContext, useEffect, useState} from "react";
import {
    createMember,
    deleteMember,
    getAllMembers,
    getMemberById,
    updateMember,
} from "../services/member.api.js";
import {
    addMemberCategory,
    deleteMemberCategory,
    getMemberCategories, updateMemberCategory,
} from "../services/memberCategory.api.js";
import AuthContext from "./auth.context.jsx";

const MemberContext = createContext({
    members: [],
    setMembers: () => {
    },
    memberCategories: [],
    setMemberCategories: () => {
    },
    addMemberCategory: () => {
    },
    selectedMember: {},
    addMember: () => {
    },
    selectMember: () => {
    },
    updateMember: () => {
    },
    deleteMember: () => {
    },
    deleteCategory: () => {
    },
    editMemberCategory: () => {
    }
});

export function MemberContextProvider({children}) {
    const [members, setMembers] = useState([]);
    const [memberCategories, setMemberCategories] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});
    const {user} = useContext(AuthContext);

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
            setMembers(resData.data);
        }
    }

    useEffect(() => {
        handleFetchMembers();
        handleFetchCategories();
    }, [user]);

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

    async function handleAddMemberCategory(categoryObj) {
        const resData = await addMemberCategory(categoryObj);
        if (resData.success) {
            const updatedList = [...memberCategories, resData.data];
            setMemberCategories(updatedList);
        }
        return resData;
    }

    async function handleSelectMember(memberID) {
        const resData = await getMemberById(memberID);
        if (resData.success) {
            setSelectedMember(resData.data);
        }
    }

    async function handleUpdateMember(memberID, memberData) {
        console.log("member data", memberID, memberData);
        const resData = await updateMember(memberID, memberData);
        if (resData.success) {
            const updatedList = members.filter((m) => m._id !== memberID);
            updatedList.push(resData.data);
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

    async function handleDeleteCategory(categoryID) {
        const resData = await deleteMemberCategory(categoryID);
        if (resData.success) {
            const updatedList = memberCategories.filter((m) => m._id !== categoryID);
            setMemberCategories(updatedList);
        }
        return resData;
    }

    async function handleEditMemberCategory(categoryID, categoryName) {
        const resData = await updateMemberCategory(categoryID, categoryName);
        if (resData.success) {
            const updatedList = memberCategories.filter((m) => m._id !== categoryID);
            updatedList.push(resData.data);
            setMemberCategories(updatedList);
        }
        return resData;
    }

    const memberCtxValue = {
        members,
        setMembers,
        memberCategories,
        setMemberCategories,
        addMemberCategory: handleAddMemberCategory,
        selectedMember,
        setSelectedMember,
        addMember: handleAddMember,
        selectMember: handleSelectMember,
        updateMember: handleUpdateMember,
        deleteMember: handleDeleteMember,
        deleteCategory: handleDeleteCategory,
        editMemberCategory: handleEditMemberCategory,
    };
    return <MemberContext.Provider value={memberCtxValue}>{children}</MemberContext.Provider>;
}

export default MemberContext;
