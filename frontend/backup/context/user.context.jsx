import { createContext } from "react";
import { updateUser } from "../../src/services/user.api";

const UserContext = createContext({
  updateName: () => {},
});

export function UserContextProvider({ children }) {
  async function updateName(name) {
    const resData = await updateUser({ name });
    return resData;
  }

  const userCtxValue = { updateName };

  return <UserContext.Provider value={userCtxValue}>{children}</UserContext.Provider>;
}

export default UserContext;
