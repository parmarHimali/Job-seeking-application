import { createContext, useState } from "react";

export const UserContext = createContext({ isAuthorized: false });

export const AppWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
