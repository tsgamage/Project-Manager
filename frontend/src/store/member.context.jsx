import {createContext, useEffect, useState} from "react";
import {createMember, deleteMember, getAllMembers, getMemberById, updateMember} from "../services/member.api.js";


const MemberContext = createContext({
    members: [],
    selectedMember: {},
    AddMember: () => {},
    SelectMember: () => {},
    UpdateMember: () => {},
    DeleteMember: () => {},
})

export function MemberContextProvider({children}) {
    const [members, setMembers] = useState([])
    const [selectedMember, setSelectedMember] = useState({})

    async function handleAddMember(memberObj) {
        const resData = await createMember(memberObj)
        if (resData.success) {
            const updatedList = [...members, resData.data]
            // Sort the list alphabetically
            updatedList.sort((a, b) => a.name.localeCompare(b.name));
            setMembers(updatedList)
        }
    }

    async function handleFetchMembers() {
        const resData = await getAllMembers()
        if (resData.success) {
            setMembers(resData.data)
        }
    }
    useEffect(() => {
        handleFetchMembers()
    },[])

    async function handleSelectMember(memberID) {
        const resData = await getMemberById(memberID)
        if (resData.success) {
            setSelectedMember(resData.data)
        }
    }

    async function handleUpdateMember(memberData) {
        const resData = await updateMember(selectedMember._id, memberData)
        if (resData.success) {
            setSelectedMember(resData.data)
        }
    }

    async function handleDeleteMember(memberID) {
        const resData = await deleteMember(memberID)
        if (resData.success) {
            const updatedList = members.filter((m) => m._id !== memberID)
            // Sort the list alphabetically
            updatedList.sort((a, b) => a.name.localeCompare(b.name));
            setMembers(updatedList)
        }
    }

    const memberCtxValue = {
        members,
        selectedMember,
        setSelectedMember,
        AddMember: handleAddMember,
        SelectMember: handleSelectMember,
        UpdateMember: handleUpdateMember,
        DeleteMember: handleDeleteMember,

    }
    return <MemberContext.Provider value={memberCtxValue}>{children}</MemberContext.Provider>
}

export default MemberContext